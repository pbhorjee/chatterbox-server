

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

    request.on('data', function (data) { /// must refactor for post on data chunking
      body += data;
      messages.push(JSON.parse(body));

      statusCode = 201;
      response.writeHead(statusCode, headers);
    });
  } else { 
    if (request.url !== "/classes/messages" && request.url !== "/log") {
      response.writeHead(statusCode, headers); 
      statusCode = 404;
      response.end();
    } else {
      response.writeHead(statusCode, headers); 
      response.end(JSON.stringify({results:messages})); 
    }
  }
};
