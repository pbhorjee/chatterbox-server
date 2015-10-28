var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"
};

var messages = [];

exports.requestHandler = function(request, response) {
  var statusCode = 200;
  var headers = defaultCorsHeaders;

  if (request.method == 'POST') {
    var body = '';

    request.on('data', function(data) {
      body += data;
    }); 
     
    request.on('end', function() {
      var message = JSON.parse(body);
      message['createdAt'] = new Date().toISOString();

      messages.push(message);

      statusCode = 201;
      response.writeHead(statusCode, headers);
      response.end();
    }); 
  } else { 
    if (request.url !== "/classes/messages" && request.url !== "/log") {
      statusCode = 404;
      response.writeHead(statusCode, headers); 
      response.end();
    } else {
      response.writeHead(statusCode, headers); 
      response.end(JSON.stringify({results:messages})); 
    }
  }
};
