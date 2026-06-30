import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.setting.findMany();
    // Convert array of settings to a key-value object
    const settingsObj = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});

    // Ensure we always have active_popup_video
    if (!settingsObj.active_popup_video) {
      settingsObj.active_popup_video = '/AdPulse 5 Years Celebration.mp4';
    }

    return NextResponse.json(settingsObj);
  } catch (error) {
    console.error('Settings API GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { key, value } = await request.json();

    if (!key) {
      return NextResponse.json({ error: 'Setting key is required' }, { status: 400 });
    }

    const setting = await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    return NextResponse.json(setting);
  } catch (error) {
    console.error('Settings API POST error:', error);
    return NextResponse.json({ error: 'Failed to save setting' }, { status: 500 });
  }
}
