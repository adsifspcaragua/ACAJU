'use server';
import { createNews, postMutirao, postProjects, postMemoriasCaicaras, postMiniMuseuItem, postDocumentPost } from '@/./services/admServies';
import { saveFileLocally } from '@/lib/upload';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createNewsSchema, createMutiraoSchema, createProjetoSchema, createMemoriaSchema, createMiniMuseuSchema, createDocumentoSchema } from '@/schemas/admSchema';
import { logAdminAction } from '@/lib/logger';

export async function postNewsActions(prevState, formData) {
    if (!currentAdminId) {
        return { generalError: 'Sessão expirada. Faça login novamente.' };
    }

    const rawData = {
        title: formData.get('title'),
        content: formData.get('content'),
        videoUrl: formData.get('videoUrl'),
        requiresReview: formData.get('requiresReview'),
    };

    const validation = createNewsSchema.safeParse(rawData);

    if (!validation.success) {
        return {
            errors: validation.error.flatten().fieldErrors,
            message: 'Preencha os campos corretamente.',
        };
    }

    const coverFile = formData.get('coverImage');

    if (!coverFile || coverFile.size === 0) {
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
            coverImage: coverPath,
            adminId: currentAdminId,
            images: imageUrls,
        })
        await logAdminAction(currentAdminId, "POST NEWS");
    } catch (error) {
        console.error('Erro ao cadastrar notícia:', error);
        return { error: 'Falha ao salvar a notícia no banco de dados.' };
    }

    // redireionamento do user
    revalidatePath('/admin/noticias');
    revalidatePath('/noticias');
    redirect('/admin/noticias')

}

export async function postMutiraoAction(prevState, formData) {
    const currentAdminId = await getSessionUserId();
    if (!currentAdminId) {
        return { generalError: 'Sessão expirada. Faça login novamente.' };
    }

    const rawData = {
        name: formData.get('name'),
        type: formData.get('type'),
        data: formData.get('data'),
        time: formData.get('time'),
        location: formData.get('location'),
        environment: formData.get('environment'),
        description: formData.get('description'),
    };

    const validation = createMutiraoSchema.safeParse(rawData);

    if (!validation) {
        return {
            errors: validation.error.flatten().fieldErrors,
            message: 'Preencha os campos corretamente.',
        };
    }

    const coverFile = formData.get('coverImage');

    if (!coverFile || coverFile.size === 0) {
        return { error: "A imagem de capa é obrigatória." };
    }

    const coverPath = await saveFileLocally(coverFile, 'mutiraoCover');

    try {

        await postMutirao({
            ...validation.data,
            coverImage: coverPath,
            adminId: currentAdminId
        });
        await logAdminAction(currentAdminId, "POST MUTIRAO");
    } catch (err) {
        console.error('Erro ao cadastrar mutirao:', err);
        return { err: 'Falha ao salvar a mutirao no banco de dados.' };
    }

}

export async function postProjectAction(prevState, formData) {
    const currentAdminId = await getSessionUserId();
    if (!currentAdminId) {
        return { generalError: 'Sessão expirada. Faça login novamente.' };
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

    if (!validation)
        return {
            errors: validation.error.flatten().fieldErrors,
            message: 'Preencha os campos corretamente.',
        };

    const coverFile = formData.get('coverImage');

    if (!coverFile || coverFile.size === 0) {
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
            coverImage: coverPath,
            adminId: currentAdminId,
            images: imageUrls,
        })
        await logAdminAction(currentAdminId, "POST PROJECTS")
    } catch (error) {
        console.error('Erro ao cadastrar projeto', error);
        return { error: 'Falha ao salvar projeto no banco de dados.' };
    }

}


export async function postMemoriasCaicarasAction(prevState, formData) {
    const currentAdminId = await getSessionUserId();
    if (!currentAdminId) {
        return { generalError: 'Sessão expirada. Faça login novamente.' };
    }

    const rawData = {
        title: formData.get('title'),
        content: formData.get('content'),
        videoUrl: formData.get('videoUrl'),
    };

    const validation = createMemoriaSchema.safeParse(rawData);

    if (!validation)
        return {
            errors: validation.error.flatten().fieldErrors,
            message: 'Preencha os campos corretamente.',
        };

    const coverFile = formData.get('coverImage');

    if (!coverFile || coverFile.size === 0) {
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
        return { error: 'Falha ao salvar memorias no banco de dados.' };
    }
}


export async function postMiniMuseuItemAction(prevState, formData) {
    const currentAdminId = await getSessionUserId();
    if (!currentAdminId) {
        return { generalError: 'Sessão expirada. Faça login novamente.' };
    }

    const rawData = {
        content: formData.get('content'),
    };

    const validation = createMiniMuseuSchema.safeParse(rawData);

    if (!validation)
        return {
            errors: validation.error.flatten().fieldErrors,
            message: 'Preencha os campos corretamente.',
        };

    const galleryFiles = formData.getAll('galleryImages');
    const imageUrls = [];

    for (const file of galleryFiles) {
        if (file && file.size > 0) {
            const path = await saveFileLocally(file, 'MiniMuseuImages');
            if (path) imageUrls.push(path);
        }
    }

    try {
        await postMiniMuseuItem({
            ...validation.data,
            adminId: currentAdminId,
            images: imageUrls,
        });
        await logAdminAction(currentAdminId, "Post mini museu")
    } catch (error) {
        console.error('Erro ao cadastrar mini museu', error);
        return { error: 'Falha ao salvar mini museu no banco de dados.' };
    }
}


/// não esquecer tenho que fazer um esquema difente para arquivos pdf etc...???? ou o mesmo galery files aceitar eles?

export async function postDocumentAction(prevState, formData) {
    const currentAdminId = await getSessionUserId();
    if (!currentAdminId) {
        return { generalError: 'Sessão expirada. Faça login novamente.' };
    }

    const rawData = {
        title: formData.get('title'),
        description: formData.get('description'),
    };

    const validation = createDocumentoSchema.safeParse(rawData);

    if (!validation)
        return {
            errors: validation.error.flatten().fieldErrors,
            message: 'Preencha os campos corretamente.',
        };

    const galleryFiles = formData.getAll('galleryImages');
    const imageUrls = [];

    for (const file of galleryFiles) {
        if (file && file.size > 0) {
            const path = await saveFileLocally(file, 'documents');
            if (path) imageUrls.push(path);
        }
    }

    try {
        await postMemoriasCaicaras({
            ...validation.data,
            adminId: currentAdminId,
            images: imageUrls,
        });
        await logAdminAction(currentAdminId, "Post mini museu")
    } catch (error) {
        console.error('Erro ao cadastrar mini museu', error);
        return { error: 'Falha ao salvar mini museu no banco de dados.' };
    }
}