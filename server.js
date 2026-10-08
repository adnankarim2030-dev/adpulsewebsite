const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

http.createServer((req, res) => {
    let url = req.url.split('?')[0]; // Remove query params
    let filePath = '.' + url;
    
    if (filePath === './') {
        filePath = './index.html';
    } else if (!path.extname(filePath)) {
        // Handle routes like /services or /contact
        if (fs.existsSync(filePath + '/index.html')) {
            filePath = filePath + '/index.html';
        } else if (fs.existsSync(filePath + '.html')) {
            filePath = filePath + '.html';
        } else {
            filePath = './index.html'; // SPA fallback
        }
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.mp4': 'video/mp4',
        '.webp': 'image/webp'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if (error.code === 'ENOENT') {
                fs.readFile('./404.html', function(err, content404) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content404 || '404 Not Found', 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}).listen(port, () => {
    console.log(`Static server running on port ${port}`);
});
