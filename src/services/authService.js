import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function autenticarAdmin(email, pass) {
  const admin = await prisma.aDM.findUnique({
    where: { email },
  });

  if (!admin) {
    return null;
  }

  const senhaValida = await bcrypt.compare(pass, admin.pass);
  if (!senhaValida) {
    return null;
  }

  const { pass: _, ...adminSemSenha } = admin;
  return adminSemSenha;
}

export async function createAdminLog({ adminId, action, ipAddress, userAgent }) {
  return await prisma.aDMLOG.create({
    data: {
      adminId,
      action,
      ipAddress,
      userAgent,
    },
  });
}

export async function cadastrarAdmin({ name, email, pass }) {

  const adminExiste = await prisma.aDM.findUnique({
    where: { email },
  });

  if (adminExiste) {
    throw new Error('EMAIL_DUPLICADO');
  }

  const hash = await bcrypt.hash(pass, 10);

  const novoAdmin = await prisma.aDM.create({
    data: {
      name,
      email,
      pass: hash,
    },
  });

  const { pass: _, ...adminSemSenha } = novoAdmin;
  return adminSemSenha;
}

export async function atualizarDadosAdmin({ id, name, email }) {
  const emailEmUso = await prisma.aDM.findFirst({
    where: {
      email,
      id: {
        not: id, 
      },
    },
  });

  if (emailEmUso) {
    throw new Error('EMAIL_JA_CADASTRADO');
  }

  const adminAtualizado = await prisma.aDM.update({
    where: { id },
    data: { name, email },
  });

  const { pass: _, ...adminSemSenha } = adminAtualizado;
  return adminSemSenha;
}

export async function alterarSenhaAdmin({ id, currentPass, newPass, confirmPass }) {
  const admin = await prisma.aDM.findUnique({
    where: { id },
  });

  if (!admin) {
    throw new Error('USUARIO_NAO_ENCONTRADO');
  }

  const senhaAtualValida = await bcrypt.compare(currentPass, admin.pass);
  console.log(senhaAtualValida);
  if (!senhaAtualValida) {
    throw new Error('SENHA INFORMADA ESTA INCORRETA', senhaAtualValida);
  }

  const novoHash = await bcrypt.hash(newPass, 10);

  await prisma.aDM.update({
    where: { id },
    data: { pass: novoHash },
  });

  return true;
}