import prisma from '@/lib/prisma';

export async function getAdminPublications() {
    const sources = [
        {
            category: 'Notícia',
            query: () => prisma.news.findMany({
                select: { id: true, title: true, content: true, videoUrl: true, coverImage: true, images: { select: { url: true } }, createdAt: true, ADM: { select: { name: true } } },
            }),
            getTitle: (record) => record.title,
            getContent: (record) => record.content,
            getFields: (record) => ({ title: record.title, content: record.content, videoUrl: record.videoUrl ?? '' }),
            getMedia: (record) => ({ coverImage: record.coverImage, galleryImages: record.images.map((image) => image.url) }),
        },
        {
            category: 'Mutirão',
            query: () => prisma.mutirao.findMany({
                select: { id: true, name: true, type: true, date: true, time: true, location: true, environment: true, description: true, coverImage: true, createdAt: true, ADM: { select: { name: true } } },
            }),
            getTitle: (record) => record.name,
            getContent: (record) => record.description,
            getFields: (record) => ({
                name: record.name,
                type: record.type.toLowerCase(),
                date: record.date.toISOString().slice(0, 10),
                time: record.time,
                location: record.location,
                environment: record.environment.toLowerCase(),
                description: record.description,
            }),
            getMedia: (record) => ({ coverImage: record.coverImage }),
        },
        {
            category: 'Projeto',
            query: () => prisma.project.findMany({
                select: { id: true, title: true, coordinator: true, objective: true, bodyContent: true, videoUrl: true, coverImage: true, images: { select: { url: true } }, createdAt: true, ADM: { select: { name: true } } },
            }),
            getTitle: (record) => record.title,
            getContent: (record) => record.bodyContent,
            getFields: (record) => ({ title: record.title, coordinator: record.coordinator, objective: record.objective, bodyContent: record.bodyContent, videoUrl: record.videoUrl ?? '' }),
            getMedia: (record) => ({ coverImage: record.coverImage, galleryImages: record.images.map((image) => image.url) }),
        },
        {
            category: 'Memória Caiçara',
            query: () => prisma.memory.findMany({
                select: { id: true, title: true, content: true, videoUrl: true, coverImage: true, memoryImages: { select: { url: true } }, createdAt: true, ADM: { select: { name: true } } },
            }),
            getTitle: (record) => record.title,
            getContent: (record) => record.content,
            getFields: (record) => ({ title: record.title, content: record.content, videoUrl: record.videoUrl ?? '' }),
            getMedia: (record) => ({ coverImage: record.coverImage, galleryImages: record.memoryImages.map((image) => image.url) }),
        },
        {
            category: 'Mini-Museu',
            query: () => prisma.miniMuseumItem.findMany({
                select: { id: true, title: true, description: true, imageUrl: true, createdAt: true, ADM: { select: { name: true } } },
            }),
            getTitle: (record) => record.title,
            getContent: (record) => record.description,
            getFields: (record) => ({ title: record.title, description: record.description ?? '' }),
            getMedia: (record) => ({ imageUrl: record.imageUrl }),
        },
        {
            category: 'Documentos',
            query: () => prisma.document.findMany({
                select: { id: true, name: true, description: true, fileUrl: true, createdAt: true, ADM: { select: { name: true } } },
            }),
            getTitle: (record) => record.name,
            getContent: (record) => record.description,
            getFields: (record) => ({ name: record.name, description: record.description }),
            getMedia: (record) => ({ fileUrl: record.fileUrl }),
        },
    ];

    const results = await Promise.all(sources.map(async (source) => {
        try {
            const records = await source.query();
            return {
                publications: records.map((record) => ({
                    id: `${source.category}-${record.id}`,
                    recordId: record.id,
                    title: source.getTitle(record),
                    content: source.getContent(record) ?? '',
                    fields: source.getFields(record),
                    media: source.getMedia(record),
                    category: source.category,
                    author: record.ADM?.name ?? 'Administrador não identificado',
                    createdAt: record.createdAt.toISOString(),
                })),
            };
        } catch (error) {
            if (error?.code === 'P2021') {
                return {
                    publications: [],
                    warning: `A categoria ${source.category} ainda não tem tabela criada no banco.`,
                };
            }

            throw error;
        }
    }));

    return {
        publications: results.flatMap((result) => result.publications)
            .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt)),
        warnings: results.flatMap((result) => result.warning ? [result.warning] : []),
    };
}

export async function getAdminPendingPublications() {
    const [news, projects] = await Promise.all([
        prisma.news.findMany({
            where: { status: 'PENDING' },
            include: { ADM: { select: { name: true } }, images: { select: { url: true } } },
            orderBy: { createdAt: 'desc' },
        }),
        prisma.project.findMany({
            where: { status: 'PENDING' },
            include: { ADM: { select: { name: true } }, images: { select: { url: true } } },
            orderBy: { createdAt: 'desc' },
        }),
    ]);

    return [
        ...news.map((item) => ({
            id: `Notícia-${item.id}`,
            recordId: item.id,
            category: 'Notícia',
            tipo: 'NOTÍCIA',
            status: 'AGUARDANDO',
            titulo: item.title,
            autor: item.ADM?.name ?? 'Administrador não identificado',
            data: item.createdAt.toISOString(),
            conteudo: item.content,
            imagemCapa: item.coverImage,
            videoUrl: item.videoUrl,
            galeria: item.images.map((image) => image.url),
        })),
        ...projects.map((item) => ({
            id: `Projeto-${item.id}`,
            recordId: item.id,
            category: 'Projeto',
            tipo: 'PROJETO',
            status: 'AGUARDANDO',
            titulo: item.title,
            autor: item.ADM?.name ?? 'Administrador não identificado',
            data: item.createdAt.toISOString(),
            conteudo: item.bodyContent,
            coordenador: item.coordinator,
            objetivo: item.objective,
            imagemCapa: item.coverImage,
            videoUrl: item.videoUrl,
            galeria: item.images.map((image) => image.url),
        })),
    ].sort((first, second) => new Date(second.data) - new Date(first.data));
}

export async function reviewAdminPublication({ id, category, decision }) {
    const model = category === 'Notícia' ? prisma.news : prisma.project;
    return model.update({ where: { id }, data: { status: decision } });
}

export async function updateAdminPublication({ id, category, fields, media = {} }) {
    const dataByCategory = {
        'Notícia': fields,
        'Mutirão': { ...fields, type: fields.type.toUpperCase(), environment: fields.environment.toUpperCase(), date: new Date(`${fields.date}T12:00:00.000Z`) },
        'Projeto': fields,
        'Memória Caiçara': fields,
        'Mini-Museu': fields,
        'Documentos': fields,
    };
    const modelByCategory = {
        'Notícia': prisma.news,
        'Mutirão': prisma.mutirao,
        'Projeto': prisma.project,
        'Memória Caiçara': prisma.memory,
        'Mini-Museu': prisma.miniMuseumItem,
        'Documentos': prisma.document,
    };

    const data = { ...dataByCategory[category] };

    if (category === 'Notícia' || category === 'Projeto' || category === 'Memória Caiçara' || category === 'Mutirão') {
        if (media.coverImage) data.coverImage = media.coverImage;
    }
    if (category === 'Notícia' && media.galleryImages) {
        data.images = { deleteMany: {}, create: media.galleryImages.map((url) => ({ url })) };
    }
    if (category === 'Projeto' && media.galleryImages) {
        data.images = { deleteMany: {}, create: media.galleryImages.map((url) => ({ url })) };
    }
    if (category === 'Memória Caiçara' && media.galleryImages) {
        data.memoryImages = { deleteMany: {}, create: media.galleryImages.map((url) => ({ url })) };
    }
        if (category === 'Mini-Museu' && media.imageUrl) {
            data.imageUrl = media.imageUrl;
        }
    if (category === 'Documentos' && media.fileUrl) data.fileUrl = media.fileUrl;

    return modelByCategory[category].update({ where: { id }, data });
}

export async function deleteAdminPublication({ id, category }) {
    const modelByCategory = {
        'Notícia': prisma.news,
        'Mutirão': prisma.mutirao,
        'Projeto': prisma.project,
        'Memória Caiçara': prisma.memory,
        'Mini-Museu': prisma.miniMuseumItem,
        'Documentos': prisma.document,
    };

    return modelByCategory[category].delete({ where: { id } });
}

export async function getOperatingHours() {
    return prisma.operatingHours.findFirst({ orderBy: { updatedAt: 'desc' } });
}

export async function saveOperatingHours(data) {
    const current = await prisma.operatingHours.findFirst({ select: { id: true } });
    if (current) {
        return prisma.operatingHours.update({ where: { id: current.id }, data });
    }

    return prisma.operatingHours.create({ data });
}

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

