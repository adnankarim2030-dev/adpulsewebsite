'use server';

import { z } from 'zod';
import { sendLeadEmails } from '@/lib/email';

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

    // Default lead object to use for emails
    let lead = {
      ...validatedData,
      createdAt: new Date(),
    };

    // Try saving to database, but don't fail the whole action if database is not configured
    try {
      const { prisma } = await import('@/lib/prisma');
      const savedLead = await prisma.lead.create({
        data: validatedData,
      });
      lead = savedLead;
      console.log('New lead created in DB:', lead);
    } catch (dbError) {
      console.error('Database save failed (emails will still be sent):', dbError);
    }

    // Send confirmation and notification emails
    await sendLeadEmails(lead);

    return { success: true };
  } catch (error) {
    console.error('Error submitting lead:', error);
    return { success: false, error: 'Failed to submit form' };
  }
}

