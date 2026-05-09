'use server';

import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const leadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
});

export async function submitLead(formData) {
  try {
    const rawData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      service: formData.get('service'),
      message: formData.get('message'),
    };

    const validatedData = leadSchema.parse(rawData);

    // Save to SQLite via Prisma
    const lead = await prisma.lead.create({
      data: validatedData,
    });

    console.log('New lead created:', lead);

    return { success: true };
  } catch (error) {
    console.error('Error submitting lead:', error);
    return { success: false, error: 'Failed to submit form' };
  }
}
