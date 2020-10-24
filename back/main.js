//module(기본적으로 제공하는 기능들을 묶어놓은 것)을 가져옴
var http = require('http');
var fs = require('fs'); //file System
var url = require('url'); //require : 요구하다,가져오다

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id; //주소의 id값을 가져옴

    //console.log(request);
    if(_url == '/'){ //url이 비어있다면 
       title = 'Welcome';
    }
    if(_url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);

    fs.readFile(`./back/data/${queryData.id}`,'utf8',(err, description) => {
        if(err){
            console.error(err);return;
        }
        var template = `
    <!doctype html>
<html>
<head>
  <title>WEB1 - ${title}</title>
  <meta charset="utf-8">
</head>
<body>
  <h1><a href="/">WEB</a></h1>
  <ul>
    <li><a href="/?id=HTML">HTML</a></li>
    <li><a href="/?id=CSS">CSS</a></li>
    <li><a href="/?id=JavaScript">JavaScript</a></li>
  </ul>
  <h2>${title}</h2>
  <p>${description}</p>
</body>
</html>
    `;
    response.end(template);
    })
});

app.listen(3001);