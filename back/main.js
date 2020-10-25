//module(기본적으로 제공하는 기능들을 묶어놓은 것)을 가져옴
var http = require('http');
var fs = require('fs'); //file System
var url = require('url'); //require : 요구하다,가져오다

function templateHTML(title, list,body){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}
  </body>
  </html>
  `;
}

function templateList(files){
  var list = '<ul>';
  files.forEach(file => { //forEach : 배열을 가져와서 배열 끝까지 돌림. file = element : 배열 각각의 값
    list = list + `<li><a href='/?id=${file}'>${file}</a></li>`
  });
  list = list +'</ul>';
  return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname; //root디렉토리를 나타내는 값을 가져온다.

    if(pathname === '/'){
      if(queryData.id === undefined){
        fs.readdir('./data',(err,files)=>{
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = templateList(files);
          var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);//``:template Literal를 사용하여 값을 넘겨줄 수도 있다.
          response.writeHead(200);
          response.end(template);
        });
      }
      else {
        fs.readdir('./data',(err,files)=>{
          fs.readFile(`./data/${queryData.id}`,'utf8',(err, description) => {
            var title = queryData.id; //주소의 id값을 가져옴
            var list = templateList(files);
            var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
            response.writeHead(200);
            response.end(template);
          });
      });
  }
  } else{
    response.writeHead(404);
    response.end('Not found');
  }
});

app.listen(3001);