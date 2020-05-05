const http = require('http');

port = 3000;

const requestHandler = function (req, res) {
  var code = 200;
  var string;
  var url = req.url;
  url = url.substr(1);
  try {
    if (req.method !== 'GET') throw "method";
    if (url == '') throw "empty";
    if (isNaN(url)) throw "NaN";
    if ((url < -99999) || (99999 < url)) throw "outOfBounds";
  }
  catch (err){
    switch (err) {
      case 'method':
        code = 404;
        string = 'The method is not allowed!\n';
        break;
      case 'empty':
        code = 400;
        string = 'The url is empty!\n';
        break;
      case 'NaN':
        code = 400;
        string = 'The url is not a number!\n';
        break;
      case 'outOfBounds':
        code = 400;
        string = 'The number is out of bounds!\n';
        break;
    }
  }
  res.writeHead(code, {'Content-Type': 'text/html'});
  res.end(string);
}

const server = http.createServer(requestHandler);

server.listen(port, function() {
  console.log('Starting HTTP server on port '+ port);
});


