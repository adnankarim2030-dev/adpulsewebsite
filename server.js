const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const YOUTUBE_CHANNEL_ID = 'UCJfBhcCIDi1nuhFsdvqQLcg';

// Cache YouTube videos in memory for 10 minutes to be fast and gentle on quota
let ytCache = { data: null, timestamp: 0 };

function fetchYouTubeFeed(callback) {
    const now = Date.now();
    if (ytCache.data && (now - ytCache.timestamp < 10 * 60 * 1000)) {
        return callback(null, ytCache.data);
    }
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
    https.get(url, (res) => {
        let xml = '';
        res.on('data', chunk => xml += chunk);
        res.on('end', () => {
            try {
                const entries = [];
                const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
                let match;
                while ((match = entryRegex.exec(xml)) !== null) {
                    const entryXml = match[1];
                    const idMatch = entryXml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
                    const titleMatch = entryXml.match(/<title>([^<]+)<\/title>/);
                    if (idMatch && titleMatch) {
                        entries.push({
                            id: idMatch[1].trim(),
                            title: titleMatch[1].trim()
                        });
                    }
                }
                ytCache = { data: entries, timestamp: now };
                callback(null, entries);
            } catch (err) {
                callback(err);
            }
        });
    }).on('error', (err) => {
        if (ytCache.data) {
            callback(null, ytCache.data); // Return stale cache on network failure
        } else {
            callback(err);
        }
    });
}

http.createServer((req, res) => {
    let url;
    try {
        url = decodeURIComponent(req.url.split('?')[0]);
    } catch (e) {
        url = req.url.split('?')[0];
    }

    // Dynamic endpoint to auto-fetch latest YouTube videos
    if (url === '/api/youtube') {
        fetchYouTubeFeed((err, videos) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify({ error: 'Failed to fetch YouTube videos', details: err.message }));
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=300'
            });
            res.end(JSON.stringify({ videos: videos || [] }));
        });
        return;
    }

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
                try {
                    const dir = path.dirname(filePath);
                    const base = path.basename(filePath).toLowerCase();
                    if (fs.existsSync(dir)) {
                        const files = fs.readdirSync(dir);
                        const match = files.find(f => f.toLowerCase() === base);
                        if (match) {
                            return fs.readFile(path.join(dir, match), function(err2, content2) {
                                if (!err2) {
                                    res.writeHead(200, { 'Content-Type': contentType });
                                    res.end(content2);
                                    return;
                                }
                                res.writeHead(404, { 'Content-Type': 'text/html' });
                                res.end('404 Not Found', 'utf-8');
                            });
                        }
                    }
                } catch (e) {}

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
