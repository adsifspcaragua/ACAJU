'use server';
import { createNews, postMutirao, postProjects, postMemoriasCaicaras, postMiniMuseuItem, postDocumentPost } from '@/./services/admServies';
import { createNewsSchema, createMutiraoSchema, createProjetoSchema, createMemoriaSchema, createMiniMuseuSchema, createDocumentoSchema } from '@/schemas/admSchema';
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