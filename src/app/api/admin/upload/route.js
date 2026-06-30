import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename to remove spaces
    const name = file.name.replace(/\s+/g, '_');
    
    // Determine target upload path
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
    // Ensure directory exists
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
      // Already exists
    }

    const filePath = join(uploadDir, name);
    await writeFile(filePath, buffer);

    return NextResponse.json({ 
      success: true, 
      url: `/uploads/${name}`,
      name: file.name
    });
  } catch (error) {
    console.error('File upload API error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
