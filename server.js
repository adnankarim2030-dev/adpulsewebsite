const { createServer } = require('http');

const port = process.env.PORT || 3000;

console.log('Starting diagnostic server...');

createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    env: process.env.NODE_ENV,
    cwd: process.cwd()
  }, null, 2));
}).listen(port, () => {
  console.log(`> Diagnostic server ready on port ${port}`);
});



