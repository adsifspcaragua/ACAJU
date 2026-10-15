'use server';
import { createNews, deleteAdminPublication, getAdminPendingPublications, getAdminPublications, getOperatingHours, postMutirao, postProjects, postMemoriasCaicaras, postMiniMuseuItem, postDocumentPost, reviewAdminPublication, saveOperatingHours, updateAdminPublication } from '@/./services/admServies';
import { createNewsSchema, createMutiraoSchema, createProjetoSchema, createMemoriaSchema, createMiniMuseuSchema, createDocumentoSchema } from '@/schemas/admSchema';
import { operatingHoursSchema, updatePublicationSchemas } from '@/schemas/admSchema';
import { decrypt } from '../lib/session'
import { saveFileLocally } from '@/lib/upload';
import { logAdminAction } from '@/lib/logger';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'

async function getCurrentAdminId() {
    const cookieStore = await cookies();
    const session = await decrypt(cookieStore.get('session')?.value);
    return session?.userId ?? null;
}

function validationFailure(validation) {
    return {
        errors: validation.error.flatten().fieldErrors,
        message: 'Revise os campos indicados e tente novamente.',
    };
}

function hasUploadedFile(file) {
    return file && typeof file !== 'string' && file.size > 0 && typeof file.arrayBuffer === 'function';
}

function isImageFile(file) {
    return file.type.startsWith('image/') || /\.(png|jpe?g|webp|gif|avif)$/i.test(file.name);
}

function isPdfFile(file) {
    return file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
}

function databaseFailure(error, itemName) {
    if (error?.code === 'P2021') {
        const table = error.meta?.table;
        return `A tabela ${table ? `"${table}"` : `de ${itemName}`} não existe no banco. Sincronize as migrations do Prisma.`;
    }

    if (error?.code === 'P2022') {
        const column = error.meta?.column;
        return `A estrutura da tabela de ${itemName} está desatualizada${column ? ` (coluna ${column})` : ''}. Atualize o banco pelo schema Prisma.`;
    }

    if (error?.code === 'P2003') {
        return 'A sessão não está associada a um administrador válido. Saia e entre novamente.';
    }

    const code = error?.code ? ` (código ${error.code})` : '';
    return `Não foi possível salvar ${itemName}. Verifique os dados e a conexão com o banco${code}.`;
}

export async function getAdminPublicationsAction() {
    const currentAdminId = await getCurrentAdminId();
    if (!currentAdminId) {
        return { publications: [], warnings: [], error: 'Sua sessão expirou. Entre novamente para consultar as publicações.' };
    }

    try {
        return { ...(await getAdminPublications()), error: null };
    } catch (error) {
        console.error('Erro ao carregar publicações:', error);
        return {
            publications: [],
            warnings: [],
            error: `Não foi possível carregar as publicações do banco de dados${error?.code ? ` (código ${error.code})` : ''}.`,
        };
    }
}

export async function getAdminPendingPublicationsAction() {
    const currentAdminId = await getCurrentAdminId();
    if (!currentAdminId) {
        return { publications: [], error: 'Sua sessão expirou. Entre novamente para consultar as pendências.' };
    }

    try {
        return { publications: await getAdminPendingPublications(), error: null };
    } catch (error) {
        console.error('Erro ao carregar pendências:', error);
        return { publications: [], error: databaseFailure(error, 'as pendências') };
    }
}

export async function reviewAdminPublicationAction(_prevState, formData) {
    const currentAdminId = await getCurrentAdminId();
    if (!currentAdminId) {
        return { error: 'Sua sessão expirou. Entre novamente para analisar a publicação.' };
    }

    const id = formData.get('id');
    const category = formData.get('category');
    const decision = formData.get('decision');
    const reason = String(formData.get('reason') ?? '').trim();

    if (typeof id !== 'string' || !id || !['Notícia', 'Projeto'].includes(category) || !['APPROVED', 'REJECTED'].includes(decision)) {
        return { error: 'Não foi possível identificar a publicação ou a decisão.' };
    }
    if (decision === 'REJECTED' && reason.length < 5) {
        return { error: 'Informe uma justificativa de pelo menos 5 caracteres para rejeitar.' };
    }

    try {
        await reviewAdminPublication({ id, category, decision });
        const action = decision === 'APPROVED' ? 'APROVOU' : `REJEITOU: ${reason}`;
        await logAdminAction(currentAdminId, `${action} ${category} ${id}`.slice(0, 191));
        revalidatePath('/admin/pendencias');
        revalidatePath('/admin/gerenciarPublicacoes');
        return { success: true, id: `${category}-${id}` };
    } catch (error) {
        console.error('Erro ao analisar publicação:', error);
        return { error: databaseFailure(error, 'a publicação') };
    }
}

export async function updateAdminPublicationAction(_prevState, formData) {
    const currentAdminId = await getCurrentAdminId();
    if (!currentAdminId) {
        return { error: 'Sua sessão expirou. Entre novamente para editar a publicação.' };
    }

    const id = formData.get('id');
    const category = formData.get('category');
    const schema = updatePublicationSchemas[category];
    if (typeof id !== 'string' || !id || !schema) {
        return { error: 'Não foi possível identificar a publicação ou seus campos.' };
    }

    const rawFields = Object.fromEntries(formData.entries());
    const validation = schema.safeParse(rawFields);
    if (!validation.success) {
        return {
            errors: validation.error.flatten().fieldErrors,
            message: 'Confira o título e o conteúdo da publicação.',
        };
    }

    try {
        const media = {};
        const coverFile = formData.get('coverImage');
        const coverFolders = {
            'Notícia': 'newsCover',
            'Mutirão': 'mutiraoCover',
            'Projeto': 'projectsCover',
            'Memória Caiçara': 'memoriasCover',
            'Mini-Museu': 'MiniMuseuImages',
        };

        if (hasUploadedFile(coverFile)) {
            if (!isImageFile(coverFile)) {
                return { error: 'A capa precisa ser um arquivo de imagem (PNG, JPEG, WebP, GIF ou AVIF).' };
            }

            const coverPath = await saveFileLocally(coverFile, coverFolders[category]);
            if (category === 'Mini-Museu') media.imageUrl = coverPath;
            else media.coverImage = coverPath;
        }

        const galleryFiles = formData.getAll('galleryImages').filter(hasUploadedFile);
        if (galleryFiles.length > 0) {
            if (!galleryFiles.every(isImageFile)) {
                return { error: 'A galeria aceita somente arquivos de imagem.' };
            }

            const galleryFolders = {
                'Notícia': 'newsImage',
                'Projeto': 'projectsImages',
                'Memória Caiçara': 'memoriasImages',
            };
            if (!galleryFolders[category]) {
                return { error: 'Esta categoria não possui galeria de imagens.' };
            }
            media.galleryImages = await Promise.all(
                galleryFiles.map((file) => saveFileLocally(file, galleryFolders[category])),
            );
        }

        const documentFile = formData.get('file');
        if (hasUploadedFile(documentFile)) {
            if (category !== 'Documentos') {
                return { error: 'O arquivo PDF só pode ser alterado na categoria Documentos.' };
            }
            if (!isPdfFile(documentFile)) {
                return { error: 'O novo arquivo precisa estar no formato PDF.' };
            }
            media.fileUrl = await saveFileLocally(documentFile, 'documents');
        }

        const updated = await updateAdminPublication({ id, category, fields: validation.data, media });
        await logAdminAction(currentAdminId, `EDITOU ${category} ${id}`.slice(0, 191));
        revalidatePath('/admin/gerenciarPublicacoes');
        const updatedTitle = validation.data.title ?? validation.data.name;
        return {
            success: true,
            message: 'Publicação atualizada.',
            publication: {
                id: `${category}-${updated.id}`,
                title: updatedTitle,
                fields: validation.data,
                content: validation.data.content ?? validation.data.bodyContent ?? validation.data.description ?? '',
                media,
            },
        };
    } catch (error) {
        console.error('Erro ao editar publicação:', error);
        return { error: databaseFailure(error, 'a publicação') };
    }
}

export async function deleteAdminPublicationAction(category, id) {
    const currentAdminId = await getCurrentAdminId();
    if (!currentAdminId) {
        return { success: false, error: 'Sua sessão expirou. Entre novamente para excluir a publicação.' };
    }
    if (!['Notícia', 'Mutirão', 'Projeto', 'Memória Caiçara', 'Mini-Museu', 'Documentos'].includes(category) || typeof id !== 'string' || !id) {
        return { success: false, error: 'Não foi possível identificar a publicação.' };
    }

    try {
        await deleteAdminPublication({ category, id });
        await logAdminAction(currentAdminId, `EXCLUIU ${category} ${id}`.slice(0, 191));
        revalidatePath('/admin/gerenciarPublicacoes');
        return { success: true };
    } catch (error) {
        console.error('Erro ao excluir publicação:', error);
        return { success: false, error: databaseFailure(error, 'a publicação') };
    }
}

export async function getOperatingHoursAction() {
    const currentAdminId = await getCurrentAdminId();
    if (!currentAdminId) {
        return { hours: null, error: 'Sua sessão expirou. Entre novamente para consultar o horário.' };
    }

    try {
        const hours = await getOperatingHours();
        return {
            hours: hours ? {
                currentStatus: hours.currentStatus,
                openingTime: hours.openingTime,
                closingTime: hours.closingTime,
                additionalNotes: hours.additionalNotes ?? '',
            } : null,
            error: null,
        };
    } catch (error) {
        console.error('Erro ao carregar horário:', error);
        return { hours: null, error: databaseFailure(error, 'o horário de funcionamento') };
    }
}

export async function saveOperatingHoursAction(_prevState, formData) {
    const currentAdminId = await getCurrentAdminId();
    if (!currentAdminId) {
        return { error: 'Sua sessão expirou. Entre novamente para salvar o horário.' };
    }

    const validation = operatingHoursSchema.safeParse({
        currentStatus: formData.get('currentStatus'),
        openingTime: formData.get('openingTime'),
        closingTime: formData.get('closingTime'),
        additionalNotes: formData.get('additionalNotes'),
    });
    if (!validation.success) {
        return {
            errors: validation.error.flatten().fieldErrors,
            message: 'Confira o status e os horários informados.',
        };
    }

    try {
        await saveOperatingHours(validation.data);
        await logAdminAction(currentAdminId, 'ATUALIZOU HORARIO DE FUNCIONAMENTO');
        revalidatePath('/admin/horarioFuncionamento');
        revalidatePath('/');
        return { success: true, message: 'Horário de funcionamento salvo.' };
    } catch (error) {
        console.error('Erro ao salvar horário de funcionamento:', error);
        return { error: databaseFailure(error, 'o horário de funcionamento') };
    }
}

export async function postNewsActions(_prevState, formData) {
    const currentAdminId = await getCurrentAdminId();

    if (!currentAdminId) {
        return { error: 'Sessão inválida. Faça login novamente.' };
    }

    const rawData = {
        title: formData.get('title'),
        content: formData.get('content'),
        videoUrl: formData.get('videoUrl'),
        requiresReview: formData.get('requiresReview'),
    };

    const validation = createNewsSchema.safeParse(rawData);

    if (!validation.success) {
        return validationFailure(validation);
    }

    const coverFile = formData.get('coverImage');

    if (!coverFile || typeof coverFile === 'string' || coverFile.size === 0) {
        return { error: "A imagem de capa é obrigatória." };
    }

    const coverPath = await saveFileLocally(coverFile, 'newsCover');

    const galleryFiles = formData.getAll('galleryImages');
    const imageUrls = [];

    for (const file of galleryFiles) {
        if (file && file.size > 0) {
            const path = await saveFileLocally(file, 'newsImage');
            if (path) imageUrls.push(path);
        }
    }

    try {
        await createNews({
            ...validation.data,
            status: validation.data.requiresReview ? 'PENDING' : 'APPROVED',
            coverImage: coverPath,
            adminId: currentAdminId,
            images: imageUrls,
        })
        await logAdminAction(currentAdminId, "POST NEWS");
    } catch (error) {
        console.error('Erro ao cadastrar notícia:', error);
        return { error: databaseFailure(error, 'a notícia') };
    }

    // redireionamento do user
    revalidatePath('/admin/noticias');
    revalidatePath('/noticias');
    redirect('/admin/noticias')

}

export async function postMutiraoAction(_prevState, formData) {
    const currentAdminId = await getCurrentAdminId();

    if (!currentAdminId) {
        return { error: 'Sessão inválida. Faça login novamente.' };
    }

    const rawData = {
        name: formData.get('name'),
        type: formData.get('type'),
        date: formData.get('date'),
        time: formData.get('time'),
        location: formData.get('location'),
        environment: formData.get('environment'),
        description: formData.get('description'),
    };

    const validation = createMutiraoSchema.safeParse(rawData);

    if (!validation.success) {
        return validationFailure(validation);
    }

    const coverFile = formData.get('coverImage');

    if (!coverFile || typeof coverFile === 'string' || coverFile.size === 0) {
        return { error: "A imagem de capa é obrigatória." };
    }

    const coverPath = await saveFileLocally(coverFile, 'mutiraoCover');

    try {

        await postMutirao({
            ...validation.data,
            type: validation.data.type.toUpperCase(),
            date: new Date(`${validation.data.date}T12:00:00.000Z`),
            environment: validation.data.environment.toUpperCase(),
            coverImage: coverPath,
            adminId: currentAdminId
        });
        await logAdminAction(currentAdminId, "POST MUTIRAO");
    } catch (err) {
        console.error('Erro ao cadastrar mutirao:', err);
        return { error: databaseFailure(err, 'o mutirão') };
    }

    revalidatePath('/admin/multiroes');
    revalidatePath('/mutirao');
    redirect('/admin/multiroes');
}

export async function postProjectAction(_prevState, formData) {
    const currentAdminId = await getCurrentAdminId();
    if (!currentAdminId) {
        return { error: 'Sessão expirada. Faça login novamente.' };
    }

    const rawData = {
        title: formData.get('title'),
        coordinator: formData.get('coordinator'),
        objective: formData.get('objective'),
        content: formData.get('content'),
        videoUrl: formData.get('videoUrl'),
        requiresReview: formData.get('requiresReview'),
    };

    const validation = createProjetoSchema.safeParse(rawData);

    if (!validation.success)
        return validationFailure(validation);

    const coverFile = formData.get('coverImage');

    if (!coverFile || typeof coverFile === 'string' || coverFile.size === 0) {
        return { error: "A imagem de capa é obrigatória." };
    }

    const coverPath = await saveFileLocally(coverFile, 'projectsCover');

    const galleryFiles = formData.getAll('galleryImages');
    const imageUrls = [];

    for (const file of galleryFiles) {
        if (file && file.size > 0) {
            const path = await saveFileLocally(file, 'projectsImages');
            if (path) imageUrls.push(path);
        }
    }

    try {
        await postProjects({
            ...validation.data,
            bodyContent: validation.data.content,
            status: validation.data.requiresReview ? 'PENDING' : 'APPROVED',
            coverImage: coverPath,
            adminId: currentAdminId,
            images: imageUrls,
        })
        await logAdminAction(currentAdminId, "POST PROJECTS")
    } catch (error) {
        console.error('Erro ao cadastrar projeto', error);
        return { error: databaseFailure(error, 'o projeto') };
    }

    revalidatePath('/admin/projetos');
    revalidatePath('/projetos');
    redirect('/admin/projetos');
}


export async function postMemoriasCaicarasAction(_prevState, formData) {
    const currentAdminId = await getCurrentAdminId();
    if (!currentAdminId) {
        return { error: 'Sessão expirada. Faça login novamente.' };
    }

    const rawData = {
        title: formData.get('title'),
        content: formData.get('content'),
        videoUrl: formData.get('videoUrl'),
    };

    const validation = createMemoriaSchema.safeParse(rawData);

    if (!validation.success)
        return validationFailure(validation);

    const coverFile = formData.get('coverImage');

    if (!coverFile || typeof coverFile === 'string' || coverFile.size === 0) {
        return { error: "A imagem de capa é obrigatória." };
    }

    const coverPath = await saveFileLocally(coverFile, 'memoriasCover');

    const galleryFiles = formData.getAll('galleryImages');
    const imageUrls = [];

    for (const file of galleryFiles) {
        if (file && file.size > 0) {
            const path = await saveFileLocally(file, 'memoriasImages');
            if (path) imageUrls.push(path);
        }
    }

    try {
        await postMemoriasCaicaras({
            ...validation.data,
            coverImage: coverPath,
            adminId: currentAdminId,
            images: imageUrls,
        });
        await logAdminAction(currentAdminId, "Post Memorias caiçaras")
    } catch (error) {
        console.error('Erro ao cadastrar memorias', error);
        return { error: databaseFailure(error, 'a memória caiçara') };
    }

    revalidatePath('/admin/memoriasCaicaras');
    revalidatePath('/memoriasCaicaras');
    redirect('/admin/memoriasCaicaras');
}


export async function postMiniMuseuItemAction(_prevState, formData) {
    const currentAdminId = await getCurrentAdminId();
    if (!currentAdminId) {
        return { error: 'Sessão expirada. Faça login novamente.' };
    }

    const rawData = {
        title: formData.get('title'),
        description: formData.get('description'),
    };

    const validation = createMiniMuseuSchema.safeParse(rawData);

    if (!validation.success)
        return validationFailure(validation);

    const coverFile = formData.get('coverImage');
    if (!coverFile || typeof coverFile === 'string' || coverFile.size === 0) {
        return { error: 'A imagem do item é obrigatória.' };
    }
    const coverPath = await saveFileLocally(coverFile, 'MiniMuseuImages');

    try {
        await postMiniMuseuItem({
            ...validation.data,
            imageUrl: coverPath,
            adminId: currentAdminId,
        });
        await logAdminAction(currentAdminId, "Post mini museu")
    } catch (error) {
        console.error('Erro ao cadastrar mini museu', error);
        return { error: databaseFailure(error, 'o item do Mini-Museu') };
    }

    revalidatePath('/admin/miniMuseu');
    revalidatePath('/miniMuseu');
    redirect('/admin/miniMuseu');
}


export async function postDocumentAction(_prevState, formData) {
    const currentAdminId = await getCurrentAdminId();
    if (!currentAdminId) {
        return { error: 'Sessão expirada. Faça login novamente.' };
    }

    const rawData = {
        title: formData.get('title'),
        description: formData.get('description'),
    };

    const validation = createDocumentoSchema.safeParse(rawData);

    if (!validation.success)
        return validationFailure(validation);

    const file = formData.get('file');
    if (!file || typeof file === 'string' || file.size === 0) {
        return { error: 'O arquivo PDF é obrigatório.' };
    }
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        return { error: 'Envie um arquivo PDF válido.' };
    }
    const fileUrl = await saveFileLocally(file, 'documents');

    try {
        await postDocumentPost({
            name: validation.data.title,
            description: validation.data.description,
            fileUrl,
            adminId: currentAdminId,
        });
        await logAdminAction(currentAdminId, "POST DOCUMENT");
    } catch (error) {
        console.error('Erro ao cadastrar documento', error);
        return { error: databaseFailure(error, 'o documento') };
    }

    revalidatePath('/admin/documentos');
    redirect('/admin/documentos');
}