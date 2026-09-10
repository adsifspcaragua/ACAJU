import { headers } from 'next/headers';
import { createAdminLog } from '@/services/authService';

export async function logAdminAction(adminId, action) {
  if (!adminId) return;

  try {
    const headerList = await headers();
    const ipAddress = headerList.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
    const userAgent = headerList.get('user-agent') || 'Desconhecido';

    await createAdminLog({
      adminId,
      action,
      ipAddress,
      userAgent,
    });
  } catch (err) {
    console.error(`[LOG_ERROR] Falha ao registrar log (${action}):`, err);
  }
}