// src/schemas/authSchema.js
import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "O email deve ser uma string.",
      required_error: "O email é obrigatório."
    })
    .trim()
    .email({ message: 'Insira um e-mail válido.' }),

  pass: z
    .string({
      invalid_type_error: "A senha deve ser uma string.",
      required_error: "A senha é obrigatória."
    })
    .trim()
    .min(1, { message: 'A senha não pode estar vazia!' }),
});

export const registerSchema = z.object({
  name: z.string().trim().min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' }),
  email: z.string().trim().email({ message: 'Insira um e-mail válido.' }),
  pass: z.string().trim().min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
});

export const updateProfileSchema = z.object({
  id: z.string().min(1, { message: 'ID inválido.' }),
  name: z.string().trim().min(3, { message: 'O nome completo deve ter no mínimo 3 caracteres.' }),
  email: z.string().trim().email({ message: 'Insira um e-mail válido.' }),
});

export const changePasswordSchema = z
  .object({
    id: z.string().min(1, { message: 'ID inválido.' }),
    currentPass: z.string().trim().min(1, { message: 'Informe a senha atual.' }),
    newPass: z.string().trim().min(8, { message: 'A nova senha deve ter no mínimo 8 caracteres.' }),
    confirmPass: z.string().trim().min(8, { message: 'Confirme a nova senha.' }),
  })
  .refine((data) => data.newPass === data.confirmPass, {
    message: 'As senhas não coincidem.',
    path: ['confirmPass'],
  });