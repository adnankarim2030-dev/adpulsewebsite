const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Ensure the working directory is set to the application directory
process.chdir(__dirname);

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Run prisma generate and db push asynchronously in the background to prevent blocking server startup
try {
  const { exec } = require('child_process');
  console.log('Starting background Prisma setup (generate & db push)...');
  exec('npx prisma generate && npx prisma db push --accept-data-loss', (error, stdout, stderr) => {
    if (error) {
      console.error('Background Prisma setup failed:', error);
    } else {
      console.log('Background Prisma setup completed successfully:', stdout);
    }
  });
} catch (error) {
  console.error('Failed to initiate background Prisma commands:', error);
}

const app = next({ dev, dir: __dirname, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
