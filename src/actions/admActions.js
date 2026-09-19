'use server';
import { createNews } from '@/./services/admServies';
import { saveFileLocally } from '@/lib/upload';
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createNewsSchema } from '@/schemas/admSchema';

export async function postNewsActions(prevState, formData) {
    const cookieStore = await cookies();
    const session = await decrypt(cookieStore.get('session')?.value);

    if (!session?.userId) {
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
            adminId: session.userId,
            images: imageUrls,
        })
    } catch (error) {
        console.error('Erro ao cadastrar notícia:', error);
        return { error: 'Falha ao salvar a notícia no banco de dados.' };
    }

    // redireionamento do user
    revalidatePath('/admin/noticias');
    revalidatePath('/noticias');
    redirect('/admin/noticias')

}