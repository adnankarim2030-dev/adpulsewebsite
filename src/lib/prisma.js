import { PrismaClient } from '@prisma/client';
import { seedDatabase } from './db-seed';

const globalForPrisma = global;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Auto-seed database if empty
if (typeof window === 'undefined') {
  seedDatabase().catch((err) => console.error('Failed to trigger database seeding:', err));
}

