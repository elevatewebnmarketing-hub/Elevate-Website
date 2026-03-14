import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'portfolio');

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    if (!file || !file.size) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const ext = path.extname(file.name) || '.png';
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}${ext}`;
    await mkdir(UPLOAD_DIR, { recursive: true });
    const filePath = path.join(UPLOAD_DIR, safeName);
    const bytes = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes));

    const url = `/uploads/portfolio/${safeName}`;
    return NextResponse.json({ url });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
