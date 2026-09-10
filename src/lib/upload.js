import path from 'path';
import { mkdir, writeFile } from 'fs/promises';
import crypto from 'crypto';

export async function saveFileLocally(file, subfolder = 'news') {
  if (!file || typeof file === 'string' || file.size === 0) return null;

  // 1. Converte o arquivo do FormData em Buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 2. Define os caminhos e garante que a pasta exista
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', subfolder);
  await mkdir(uploadDir, { recursive: true });

  // 3. Gera um nome único com a extensão original
  const ext = path.extname(file.name) || '.jpg';
  const fileName = `${crypto.randomUUID()}${ext}`;
  const absolutePath = path.join(uploadDir, fileName);

  // 4. Salva o arquivo no disco
  await writeFile(absolutePath, buffer);

  // 5. Retorna o caminho relativo acessível publicamente pelo navegador
  return `/uploads/${subfolder}/${fileName}`;
}