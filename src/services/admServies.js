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
            coverImage,
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
    name,
    type,
    date,
    time,
    location,
    environment,
    coverImage,
    description,
    adminId
}) {
    return await prisma.mutirao.create({
        data: {
            name,
            type,
            date,
            time,
            location,
            environment,
            coverImage,
            description,
            adminId
        },
    });
}

export async function postProjects({
    title,
    coordinator,
    objective,
    bodyContent,
    coverImage,
    videoUrl,
    status,
    adminId,
    images = [],
}) {
    return await prisma.project.create({
        data: {
            title,
            coordinator,
            objective,
            bodyContent,
            coverImage,
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

export async function postMemoriasCaicaras({
    title,
    content,
    coverImage,
    videoUrl,
    adminId,
    images = []
}) {
    return await prisma.memory.create({
        data: {
            title,
            content,
            coverImage,
            videoUrl,
            adminId,
            ...(images.length > 0 && {
                memoryImages: {
                    create: images.map((url) => ({
                        url,
                    })),
                },
            }),
        },
        include: {
            memoryImages: true,
        },
    })
}

export async function postMiniMuseuItem({
    title,
    description,
    imageUrl,
    adminId
}) {
    return await prisma.miniMuseumItem.create({
        data: {
            title,
            description,
            imageUrl,
            adminId,
        },
    });
}

export async function postDocumentPost({
    name,
    description,
    fileUrl,
    adminId
}) {
    return await prisma.document.create({
        data: {
            name,
            description,
            fileUrl,
            adminId,
        },
    });
}

