var http = require('http');
var server = http.createServer(function(request, response){
    var headers = request.headers;
    var method = request.method;
    var url = request.url;
    var body = [];

    request.on('error', function(err) {
        console.error(err);
    }).on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();

      response.on('error', function(err) {
          console.error(err);
      });

      console.log(headers, method, url, body);

      if (method === 'GET' || method === 'HEAD') {
          response.statusCode = 200;
          response.setHeader('Content-Type','text/html');
      };

      if (method === 'GET'){
          response.write('<!doctype html>');
          response.write('<html>');
          response.write('<title>Hello World!</title>');
          response.write('<p>Hello World!');
          response.write('</html>');
      };

      if (method === 'POST' || method === 'PUT'){
          console.log(body);
          response.statusCode = 302;
          response.setHeader('Location', '/');


      };

      if (method !== 'GET' || method !== 'HEAD' || method !== 'POST' || method !== 'PUT') {
          response.statusCode = 403;
      };



      var responseBody = {
          headers: headers,
          method: method,
          url: url,
          body, body
      };

      response.end();

  });
}).listen(8080);
