const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index-brutalist.html' : req.url);
    fs.readFile(filePath, (err, content) => {
        if (err) { res.writeHead(404); res.end('Error File Not Found'); } 
        else { res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(content, 'utf-8'); }
    });
}).listen(8083);
