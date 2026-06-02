const http = require('http');

const data = JSON.stringify({
  code: 'def pearson_correlation(X):\n    return X\n',
  testcase: ''
});

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/problems/pearson-correlation/submit',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log('Response:', body));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
