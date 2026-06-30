const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Ensure the working directory is set to the application directory
process.chdir(__dirname);

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Run prisma generate on startup to ensure the server-side client is up-to-date
try {
  const { execSync } = require('child_process');
  console.log('Running prisma generate on startup...');
  execSync('npx prisma@5.22.0 generate', { stdio: 'inherit' });
  console.log('Prisma generate completed successfully.');
} catch (error) {
  console.error('Failed to run prisma generate on startup:', error);
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
