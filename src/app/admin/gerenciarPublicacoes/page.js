import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';
import { getAdminPublications } from '@/services/admServies';
import GerenciarPublicacoesClient from './GerenciarPublicacoesClient';

export default async function GerenciarPublicacoes() {
  const cookieStore = await cookies();
  const session = await decrypt(cookieStore.get('session')?.value);

  if (!session?.userId) {
    return (
      <GerenciarPublicacoesClient
        initialPublications={[]}
        warnings={[]}
        loadError="Sua sessão expirou. Entre novamente para consultar as publicações."
      />
    );
  }

  try {
    const { publications, warnings } = await getAdminPublications();
    return <GerenciarPublicacoesClient initialPublications={publications} warnings={warnings} loadError="" />;
  } catch (error) {
    console.error('Erro ao carregar publicações:', error);
    return (
      <GerenciarPublicacoesClient
        initialPublications={[]}
        warnings={[]}
        loadError="Não foi possível carregar as publicações do banco de dados."
      />
    );
  }
}

