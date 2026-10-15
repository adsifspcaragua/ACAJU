'use server';

import { loginSchema, registerSchema, updateProfileSchema, changePasswordSchema } from '@/schemas/authSchema';
import { autenticarAdmin, cadastrarAdmin, atualizarDadosAdmin, alterarSenhaAdmin, listarAdmins } from '@/services/authService';
import { createSession, deleteSession, decrypt } from '../lib/session'
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers'
import { logAdminAction } from '@/lib/logger';

async function getCurrentAdminId() {
  const cookieStore = await cookies();
  const session = await decrypt(cookieStore.get('session')?.value);
  return session?.userId ?? null;
}

export async function loginAction(_prevState, formData) {
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


export async function registerAction(_prevState, formData) {
  const currentAdminId = await getCurrentAdminId();
  if (!currentAdminId) {
    return { success: false, message: 'Sua sessão expirou. Entre novamente para cadastrar um administrador.' };
  }

  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    pass: formData.get('pass'),
  };

  const validation = registerSchema.safeParse(rawData);
  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
      message: 'Confira os campos destacados e tente novamente.',
    };
  }

  try {
    const newAdmin = await cadastrarAdmin(validation.data);
    await logAdminAction(currentAdminId, 'CADASTRAR NOVO ADM');
    revalidatePath('/admin/gerenciarEquipe');

    return {
      success: true,
      message: 'Administrador cadastrado com sucesso!',
      member: {
        id: newAdmin.id,
        name: newAdmin.name,
        lastAccess: null,
        totalPublications: 0,
      },
    };
  } catch (error) {
    console.error('Erro ao cadastrar administrador:', error);

    if (error.message === 'EMAIL_DUPLICADO' || error.code === 'P2002') {
      return { success: false, message: 'Este e-mail já está cadastrado. Use outro endereço.' };
    }

    if (error.code === 'P2021' || error.code === 'P2022') {
      return { success: false, message: 'A tabela de administradores está diferente do schema Prisma. Atualize o banco e tente novamente.' };
    }

    const code = error.code ? ` (código ${error.code})` : '';
    return { success: false, message: `Não foi possível salvar o administrador. Verifique o banco de dados e tente novamente${code}.` };
  }
}

export async function getTeamMembersAction() {
  const currentAdminId = await getCurrentAdminId();
  if (!currentAdminId) {
    return { members: [], error: 'Sua sessão expirou. Entre novamente para consultar a equipe.' };
  }

  try {
    const admins = await listarAdmins();
    return {
      members: admins.map((admin) => ({
        ...admin,
        lastAccess: admin.lastAccess?.toISOString() ?? null,
      })),
      error: null,
    };
  } catch (error) {
    console.error('Erro ao carregar membros da equipe:', error);
    return {
      members: [],
      error: 'Não foi possível carregar a equipe. Verifique a conexão e as tabelas do banco de dados.',
    };
  }
}

export async function updateProfileAction(_prevState, formData) {
  const adminId = await getCurrentAdminId();
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

export async function changePasswordAction(_prevState, formData) {

  const adminId = await getCurrentAdminId();
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