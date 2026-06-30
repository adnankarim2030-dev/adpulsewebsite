const fs = require('fs');
const path = require('path');
const { createServer } = require('http');
const { parse } = require('url');

// Ensure working directory is correct
process.chdir(__dirname);

const port = process.env.PORT || 3000;

try {
  console.log('Starting Next.js custom server...');
  const next = require('next');
  const dev = process.env.NODE_ENV !== 'production';
  const app = next({ dev, dir: __dirname, hostname: 'localhost', port });
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
        console.log(`> Ready on http://localhost:${port}`);
      });
  }).catch((err) => {
    handleStartupError(err);
  });

} catch (err) {
  handleStartupError(err);
}

function handleStartupError(err) {
  console.error('CRITICAL STARTUP ERROR:', err);
  
  // Write crash log
  try {
    fs.writeFileSync(
      path.join(__dirname, 'crash-log.txt'), 
      `Date: ${new Date().toISOString()}\nError: ${err.message}\nStack: ${err.stack}\n`
    );
  } catch (writeErr) {
    console.error('Failed to write crash log:', writeErr);
  }

  // Start fall-back server to show error in browser
  createServer((req, res) => {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(`
      <html>
        <head>
          <title>Application Startup Error</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 2rem; background: #0f172a; color: #f8fafc; }
            .container { max-width: 800px; margin: 0 auto; background: #1e293b; border: 1px solid #334155; padding: 2rem; border-radius: 12px; }
            h1 { color: #f43f5e; margin-top: 0; }
            pre { background: #020617; padding: 1.5rem; border-radius: 8px; overflow-x: auto; border: 1px solid #1e293b; color: #fda4af; font-family: monospace; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Application Startup Error (500)</h1>
            <p>The application failed to start due to a critical error:</p>
            <pre><code>\${err.stack || err.message || err}</code></pre>
            <p>Please share this stack trace with the developer to resolve the issue.</p>
          </div>
        </body>
      </html>
    `);
  }).listen(port);
}


