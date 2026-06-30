import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { id: 'asc' },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error('Services API GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { title, description, slug } = data;

    if (!title || !description || !slug) {
      return NextResponse.json({ error: 'Title, description, and slug are required' }, { status: 400 });
    }

    // Check if slug is unique
    const existing = await prisma.service.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'Service with this slug already exists' }, { status: 400 });
    }

    const service = await prisma.service.create({
      data: {
        slug,
        number: data.number || null,
        title,
        shortTitle: data.shortTitle || title,
        tagline: data.tagline || null,
        description,
        image: data.image || null,
        images: data.images ? JSON.stringify(data.images) : null,
        features: data.features ? JSON.stringify(data.features) : null,
        whyChoose: data.whyChoose ? JSON.stringify(data.whyChoose) : null,
        price: data.price || null,
        icon: data.icon || null,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error('Services API POST error:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { id, title, description, slug } = data;

    if (!id || !title || !description || !slug) {
      return NextResponse.json({ error: 'ID, title, description, and slug are required' }, { status: 400 });
    }

    // Check if slug is unique for other services
    const existing = await prisma.service.findFirst({
      where: {
        slug,
        id: { not: id }
      }
    });
    if (existing) {
      return NextResponse.json({ error: 'Service with this slug already exists' }, { status: 400 });
    }

    const service = await prisma.service.update({
      where: { id: parseInt(id) },
      data: {
        slug,
        number: data.number || null,
        title,
        shortTitle: data.shortTitle || title,
        tagline: data.tagline || null,
        description,
        image: data.image || null,
        images: data.images ? JSON.stringify(data.images) : null,
        features: data.features ? JSON.stringify(data.features) : null,
        whyChoose: data.whyChoose ? JSON.stringify(data.whyChoose) : null,
        price: data.price || null,
        icon: data.icon || null,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error('Services API PUT error:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.service.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Services API DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
