import { NextResponse } from 'next/server';
import { exec } from 'child_process';

export const dynamic = 'force-dynamic';

export async function GET() {
  return new Promise((resolve) => {
    console.log('Setup trigger: running prisma db push...');
    exec('npx prisma@5.22.0 db push --accept-data-loss', (error, stdout, stderr) => {
      if (error) {
        console.error('Setup failed:', error);
        resolve(NextResponse.json({ 
          success: false, 
          error: error.message,
          stderr: stderr 
        }, { status: 500 }));
      } else {
        console.log('Setup completed successfully.');
        resolve(NextResponse.json({ 
          success: true, 
          stdout: stdout,
          stderr: stderr 
        }));
      }
    });
  });
}
