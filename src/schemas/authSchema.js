// src/schemas/authSchema.js
import { z } from 'zod';

export const PASSWORD_REQUIREMENTS = [
  { key: 'minLength', label: 'Pelo menos 8 caracteres', test: (password) => password.length >= 8 },
  { key: 'uppercase', label: 'Uma letra maiúscula', test: (password) => /[A-Z]/.test(password) },
  { key: 'lowercase', label: 'Uma letra minúscula', test: (password) => /[a-z]/.test(password) },
  { key: 'number', label: 'Um número', test: (password) => /\d/.test(password) },
  { key: 'special', label: 'Um caractere especial', test: (password) => /[^A-Za-z0-9]/.test(password) },
];

export const isStrongPassword = (password) =>
  PASSWORD_REQUIREMENTS.every(({ test }) => test(password));

const strongPasswordSchema = z
  .string()
  .min(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
  .regex(/[A-Z]/, { message: 'A senha deve conter uma letra maiúscula.' })
  .regex(/[a-z]/, { message: 'A senha deve conter uma letra minúscula.' })
  .regex(/\d/, { message: 'A senha deve conter um número.' })
  .regex(/[^A-Za-z0-9]/, { message: 'A senha deve conter um caractere especial.' });

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
  pass: strongPasswordSchema,
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
    newPass: strongPasswordSchema,
    confirmPass: strongPasswordSchema,
  })
  .refine((data) => data.newPass === data.confirmPass, {
    message: 'As senhas não coincidem.',
    path: ['confirmPass'],
  });