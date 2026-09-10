'use server';
import { createNews } from '@/./services/admServies';
import { saveFileLocally } from '@/lib/upload';
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function postNewsActions(prevState, formData) {

    // verefivar se a sessão existe (teoricamente não precisa pois existe a proxy e caso fosse o caso o user nem estaria ali, mas mais uma camada de segurança não faz mal)
    const cookieStore = await cookies();
    const session = await decrypt(cookieStore.get('session')?.value);

    if (!session?.userId) {
        return { error: 'Sessão inválida. Faça login novamente.' };
    }

    // extraçao das strings
    const title = formData.get('title');
    const content = formData.get('content');
    const videoUrl = formData.get('videoUrl') || null;

    if (!title || !content) {
        return { error: 'Título ou conteudo estão vazios ou não foram inseridos.' };
    }

    // upload da cover image
    const coverFile = formData.get('coverImage');

    if (!coverFile || coverFile.size === 0) {
        return { error: "A imagem de capa é obrigatória." };
    }

    const coverPath = await saveFileLocally(coverFile, 'news'); 

    // upload de imagens adicionais

    const galleryFiles = formData.getAll('galleryImages');
    const imageUrls = [];

    for (const file of galleryFiles) {
        if (file && file.size > 0) {
            const path = await saveFileLocally(file, 'news');
            if (path) imageUrls.push(path);
        }
    }

    // Status 
    // Inputs tipo checkbox/switch enviam 'on' quando marcados
    const requiresReview = formData.get('requiresReview') === 'on';
    const status = requiresReview ? 'PENDING' : 'PUBLISHED';

    //  chamada da função de criar news do service (createNews)
    try {
        await createNews({
            title,
            content,
            coverImage: coverPath,
            videoUrl,
            status,
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