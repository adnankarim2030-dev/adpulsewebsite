const { createServer } = require('http');
const { parse } = require('url');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const startDiagnosticServer = (error) => {
  createServer((req, res) => {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <h1>Application Startup Error</h1>
      <pre>${error.stack || error.toString()}</pre>
    `);
  }).listen(port, () => {
    console.error('Diagnostic server started due to startup error:', error);
  });
};

try {
  console.log('Loading Next.js...');
  const next = require('next');
  const app = next({ dev, hostname, port });
  const handle = app.getRequestHandler();

  console.log('Preparing Next.js app...');
  app.prepare()
    .then(() => {
      console.log('Next.js app prepared successfully. Starting HTTP server...');
      createServer(async (req, res) => {
        try {
          const parsedUrl = parse(req.url, true);
          await handle(req, res, parsedUrl);
        } catch (err) {
          console.error('Error occurred handling request:', err);
          res.statusCode = 500;
          res.end('Internal Server Error');
        }
      }).listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
      });
    })
    .catch((err) => {
      console.error('Failed to prepare Next.js app:', err);
      startDiagnosticServer(err);
    });

} catch (err) {
  console.error('Failed to initialize Next.js server:', err);
  startDiagnosticServer(err);
}


