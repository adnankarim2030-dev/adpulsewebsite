import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { id: 'asc' },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Projects API GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, youtubeId, desc } = data;

    if (!name || !youtubeId || !desc) {
      return NextResponse.json({ error: 'Name, YouTube ID, and Description are required' }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        name,
        sector: data.sector || null,
        logo: data.logo || null,
        youtubeId,
        desc,
        clientName: data.clientName || null,
        results: data.results || null,
        imageUrl: data.imageUrl || null,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Projects API POST error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { id, name, youtubeId, desc } = data;

    if (!id || !name || !youtubeId || !desc) {
      return NextResponse.json({ error: 'ID, Name, YouTube ID, and Description are required' }, { status: 400 });
    }

    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        name,
        sector: data.sector || null,
        logo: data.logo || null,
        youtubeId,
        desc,
        clientName: data.clientName || null,
        results: data.results || null,
        imageUrl: data.imageUrl || null,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Projects API PUT error:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.project.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Projects API DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
