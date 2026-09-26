'use server';
import { createNews, postMutirao } from '@/./services/admServies';
import { saveFileLocally } from '@/lib/upload';
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createNewsSchema, createMutiraoSchema } from '@/schemas/admSchema';
import { logAdminAction } from '@/lib/logger';

export async function postNewsActions(prevState, formData) {
    const currentAdminId = await getSessionUserId();
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

    const coverPath = await saveFileLocally(coverFile, 'news');

    const galleryFiles = formData.getAll('galleryImages');
    const imageUrls = [];

    for (const file of galleryFiles) {
        if (file && file.size > 0) {
            const path = await saveFileLocally(file, 'news');
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
        data: formData.get('time'),
        data: formData.get('location'),
        data: formData.get('environment'),
        data: formData.get('description'),
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

    try {

        await postMutirao({
            ...validation.data,
            coverImage: coverFile,
            adminId: currentAdminId
        });
        await logAdminAction(currentAdminId, "POST MUTIRAO");
    } catch (err) {
        console.error('Erro ao cadastrar mutirao:', err);
        return { err: 'Falha ao salvar a mutirao no banco de dados.' };
    }

}