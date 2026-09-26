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
    data,
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
            data,
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
    return await prisma.Project.create({
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
    return await prisma.Memory.create({
        data: {
            title,
            content,
            coverImage,
            videoUrl,
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
    })
}

export async function postMiniMuseuItem({
    description,
    coverImage,
    adminId
}) {
    return await prisma.miniMuseumItem.create({
        description,
        coverImage,
        adminId
    })
}

export async function postDocumentPost({
    name,
    description,
    fileUrl,
    adminId
}) {
    return await prisma.document.create({
        name,
        description,
        fileUrl,
        adminId
    })
}

