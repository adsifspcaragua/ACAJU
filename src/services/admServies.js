import prisma from '@/lib/prisma';

export async function createNews({
    title,
    content,
    coverImage,
    videoUrl,
    status = 'PENDING',
    adminId,
    images = []
}) {
    return await prisma.news.create({
        data: {
            title,
            content,
            coverImage: coverImage,
            videoUrl: videoUrl || null,
            status,
            adminId,

            ...(images.length > 0 && {
                images: {
                    create: images.map((url) => ({
                        url,
                    })),
                },
            }),
        },
        include: {
            images: true,
        },
    });
}