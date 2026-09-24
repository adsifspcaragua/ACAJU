import prisma from '@/lib/prisma';

export async function createNews({
    title,
    content,
    coverImage,
    videoUrl,
    status,
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

export async function postMutirao({
    title,
    type,
    data,
    hour,
    place,
    ambiente,
    coverImage,
    content,
    adminId
}) {
    return await prisma.mutirao.create({
        data: {
            title,
            type,
            data,
            hour,
            place,
            ambiente,
            coverImage,
            content,
            adminId
        },
    });
}

export async function postProjects({
    title,
    coordinator,
    objective,
    content,
    coverImage,
    videoUrl,
    images = [],
    status,
    adminId
}) {
    return await prisma.Project.create({
        data: {
            title,
            coordinator,
            objective,
            content,
            coverImage: coverImage,
            videoUrl: videoUrl || null,
            
        },
    });
}