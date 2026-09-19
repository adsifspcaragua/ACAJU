import { z } from 'zod';

const requiresReviewSchema = z
    .enum(['on', 'off'])
    .optional()
    .transform((val) => val === 'on');

const youtubeUrlSchema = z
    .string()
    .trim()
    .optional()
    .refine(
        (val) => !val || val.includes('youtube.com') || val.includes('youtu.be'),
        { message: 'Insira um link válido do YouTube.' }
    );

    

export const createNewsSchema = z.object({
    title: z
        .string({ required_error: 'O título é obrigatório.' })
        .trim()
        .min(3, { message: 'O título deve ter no mínimo 3 caracteres.' })
        .max(255, { message: 'O título é muito longo.' }),

    content: z
        .string({ required_error: 'O conteúdo é obrigatório.' })
        .trim()
        .min(10, { message: 'O conteúdo deve ter no mínimo 10 caracteres.' }),

    videoUrl: youtubeUrlSchema,

    requiresReview: requiresReviewSchema,
});



export const createMutiraoSchema = z.object({
    name: z
        .string({ required_error: 'O nome do mutirão é obrigatório.' })
        .trim()
        .min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' }),

    type: z.enum(['limpeza', 'plantio', 'outro'], {
        errorMap: () => ({ message: 'Selecione um tipo válido de mutirão.' }),
    }),

    date: z
        .string({ required_error: 'A data é obrigatória.' })
        .min(1, { message: 'Informe a data do mutirão.' }),

    time: z
        .string({ required_error: 'O horário é obrigatório.' })
        .min(1, { message: 'Informe o horário do mutirão.' }),

    local: z
        .string({ required_error: 'O local é obrigatório.' })
        .trim()
        .min(3, { message: 'Informe o local completo.' }),

    environment: z.enum(['praia', 'rio', 'mangue', 'restinga', 'urbano'], {
        errorMap: () => ({ message: 'Selecione um ambiente válido.' }),
    }),

    description: z
        .string({ required_error: 'A descrição curta é obrigatória.' })
        .trim()
        .min(10, { message: 'A descrição deve ter no mínimo 10 caracteres.' }),

    requiresReview: requiresReviewSchema,
});



export const createProjetoSchema = z.object({
    title: z
        .string({ required_error: 'O título do projeto é obrigatório.' })
        .trim()
        .min(3, { message: 'O título deve ter no mínimo 3 caracteres.' }),

    coordinator: z
        .string({ required_error: 'O nome do coordenador é obrigatório.' })
        .trim()
        .min(3, { message: 'Informe o nome do coordenador.' }),

    objective: z
        .string({ required_error: 'O objetivo é obrigatório.' })
        .trim()
        .min(10, { message: 'Descreva o objetivo de forma breve.' }),

    content: z
        .string({ required_error: 'O corpo do projeto é obrigatório.' })
        .trim()
        .min(20, { message: 'O texto detalhado do projeto deve ser mais completo.' }),

    videoUrl: youtubeUrlSchema,

    requiresReview: requiresReviewSchema,
});



export const createMemoriaSchema = z.object({
    title: z
        .string({ required_error: 'O título da memória é obrigatório.' })
        .trim()
        .min(3, { message: 'O título/figura homenageada deve ter no mínimo 3 caracteres.' }),

    content: z
        .string({ required_error: 'O conteúdo da memória é obrigatório.' })
        .trim()
        .min(15, { message: 'O conteúdo da memória deve ter no mínimo 15 caracteres.' }),

    videoUrl: youtubeUrlSchema
});



export const createDocumentoSchema = z.object({
    title: z
        .string({ required_error: 'O nome do documento é obrigatório.' })
        .trim()
        .min(3, { message: 'O nome do documento deve ter no mínimo 3 caracteres.' }),

    description: z
        .string({ required_error: 'A descrição é obrigatória.' })
        .trim()
        .min(10, { message: 'Forneça uma breve descrição do documento.' }),
});