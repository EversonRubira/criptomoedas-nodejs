const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const https = require('https');

const opt = {
'default': { 'folder': 'www', 'document': 'index.html', 'port': 8081, 'favicon': ''},
'extensions': {
    'htm': 'text/html; charset=utf-8',
    'html': 'text/html; charset=utf-8',
    'js': 'application/javascript; charset=utf-8',
    'json': 'application/json; charset=utf-8',
    'css': 'text/css; charset=utf-8',
    'gif': 'image/gif',
    'jpg': 'image/jpg',
    'png': 'image/png',
    'ico': 'image/x-icon'}
}

function mimeType(fileName) {
    let extension = path.extname(fileName);
    extension = (extension[0] == '.') ? extension.slice(1) : extension;
    return opt.extensions[extension];
}
    
function router(request) {
    let pathname = url.parse(request.url).pathname;
    switch (pathname) {
        case '/': pathname += opt.default.document; break;
        case '/favicon.ico': pathname = opt.default.favicon; break;
    }
    return path.join(__dirname, opt.default.folder, pathname);
}

const server = http.createServer( (request, response) => {
    console.log(`Request for ${request.url} received.`);
    const filename = router(request);
    if (request.url === '/api/coins') {
        const options = {
            hostname: 'api.coingecko.com',
            path: '/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=1&sparkline=false',
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0' // Evita bloqueio do Cloudflare
            }
        };
    
        const apiReq = https.request(options, (apiRes) => {
            let data = '';
            apiRes.on('data', chunk => data += chunk);
            apiRes.on('end', () => {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(data);
            });
        });
    
        apiReq.on('error', (err) => {
            console.error(err);
            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ error: 'Erro ao consultar CoinGecko' }));
        });
    
        apiReq.end();
        return;
    }
    

    fs.readFile(filename, (err, data) => {
        if (err) {
            console.log(err);
            response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            response.write('HTTP Status: 404 : NOT FOUND');
        } else {
            response.writeHead(200, { 'Content-Type': mimeType(filename) });
            response.write(data);
        }
        response.end();
    });
});

server.listen(opt.default.port, () => {
    console.log(`Running at http://localhost:${opt.default.port}`)
});
