'use server';

import { loginSchema, registerSchema, updateProfileSchema, changePasswordSchema } from '@/schemas/authSchema';
import { autenticarAdmin, cadastrarAdmin, atualizarDadosAdmin, alterarSenhaAdmin, createAdminLog } from '@/services/authService';
import { createSession, deleteSession, decrypt } from '../lib/session'
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers'
import { logAdminAction } from '@/lib/logger';

export async function loginAction(prevState, formData) {
  const rawData = {
    email: formData.get('email'),
    pass: formData.get('pass'),
  };

  const validation = loginSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Preencha os campos corretamente.',
    };
  }

  const { email, pass } = validation.data;

  const admin = await autenticarAdmin(email, pass);

  if (!admin) {
    return {
      message: 'E-mail ou senha incorretos.',
    };
  }

  await createSession(admin.id);
  await logAdminAction(admin.id, 'LOGIN');

  redirect('/admin/meuPerfil');
}


export async function registerAction(prevState, formData) {
  const currentAdminId = await getSessionUserId();
  if (!currentAdminId) {
    return { generalError: 'Sessão expirada. Faça login novamente.' };
  }

  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    pass: formData.get('pass'),
  };

  const validation = registerSchema.safeParse(rawData);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Preencha todos os campos corretamente.',
    };
  }

  try {
    await cadastrarAdmin(validation.data);
    await logAdminAction(currentAdminId, 'CADASTRAR NOVO ADM');
    revalidatePath('/admin');

    return { success: true, message: 'Administrador cadastrado com sucesso!' };
  } catch (error) {
    if (error.message === 'EMAIL_DUPLICADO') {
      return { message: 'Este e-mail já está cadastrado no sistema.' };
    }
    return { message: 'Erro interno ao cadastrar administrador.' };
  }
}

export async function updateProfileAction(prevState, formData) {
  const adminId = await getSessionUserId();
  if (!adminId) {
    return { generalError: 'Sessão expirada. Faça login novamente.' };
  }

  const rawData = {
    id: adminId,
    name: formData.get('name'),
    email: formData.get('email'),
  };

  const validation = updateProfileSchema.safeParse(rawData);

  if (!validation.success) {
    console.log('Erro no Zod:', validation.error.flatten().fieldErrors);
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Preencha os campos corretamente.',
    };
  }

  try {
    await atualizarDadosAdmin(validation.data);
    await logAdminAction(adminId, 'UPDATE DADOS ADM');
    revalidatePath('/admin/meuPerfil');

    return { success: true, message: 'Dados atualizados com sucesso!' };
  } catch (error) {
    console.error('Erro no Service/Prisma:', error);
    if (error.message === 'EMAIL_DUPLICADO') {
      return { message: 'Este e-mail já está em uso por outro administrador.' };
    }
    return { message: 'Erro ao atualizar informações.' };
  }
}

export async function changePasswordAction(prevState, formData) {

  const adminId = await getSessionUserId();
  if (!adminId) {
    return { generalError: 'Sessão expirada. Faça login novamente.' };
  }

  const rawData = {
    id: adminId,
    currentPass: formData.get('currentPass'),
    newPass: formData.get('newPass'),
    confirmPass: formData.get('confirmPass'),
  };

  const validation = changePasswordSchema.safeParse(rawData);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Verifique os requisitos da nova senha.',
    };
  }

  try {
    await alterarSenhaAdmin(validation.data);
    await logAdminAction(adminId, 'UPDATE SENHA');

    return { success: true, message: 'Senha alterada com sucesso!' };
  } catch (err) {
    console.error("Erro detalhado no changePassword:", err);

    return {
      message: 'Erro ao alterar a senha.',
      errorDetails: err?.message || String(err)
    };
  }
}

export async function logout() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session')?.value;
    const session = sessionToken ? await decrypt(sessionToken) : null;

    if (session?.userId) {
      await logAdminAction(session.userId, 'LOGOUT');
    }
  } catch (err) {
    console.error('Erro ao registrar log de logout:', err);
  }

  // Destrói a sessão e manda para o login
  await deleteSession();
  redirect('/admin/login');
}