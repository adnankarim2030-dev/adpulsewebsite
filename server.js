const { createServer } = require('http');
const { parse } = require('url');

let errorOccurred = null;
let nextApp = null;
let nextHandle = null;

try {
  console.log('Loading Next.js...');
  const next = require('next');
  const dev = process.env.NODE_ENV !== 'production';
  const hostname = 'localhost';
  const port = process.env.PORT || 3000;

  nextApp = next({ dev, hostname, port });
  nextHandle = nextApp.getRequestHandler();

  nextApp.prepare()
    .then(() => {
      console.log('Next.js app prepared successfully.');
    })
    .catch((err) => {
      console.error('Error in nextApp.prepare():', err);
      errorOccurred = err;
    });

} catch (err) {
  console.error('Crash during server initialization:', err);
  errorOccurred = err;
}

const port = process.env.PORT || 3000;

createServer(async (req, res) => {
  if (errorOccurred) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <h1>Application Startup Error</h1>
      <pre>${errorOccurred.stack || errorOccurred.toString()}</pre>
    `);
    return;
  }

  try {
    const parsedUrl = parse(req.url, true);
    if (nextHandle) {
      await nextHandle(req, res, parsedUrl);
    } else {
      res.statusCode = 503;
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>Application is starting up, please refresh in a few seconds...</h1>');
    }
  } catch (err) {
    console.error('Error occurred handling', req.url, err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<h1>Internal Server Error</h1><pre>${err.stack || err.toString()}</pre>`);
  }
}).listen(port, () => {
  console.log(`> Server listening on port ${port}`);
});

