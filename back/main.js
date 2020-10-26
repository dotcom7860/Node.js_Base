//module(기본적으로 제공하는 기능들을 묶어놓은 것)을 가져옴
var http = require('http');
var fs = require('fs'); //file System
var url = require('url'); //require : 요구하다,가져오다
var templates = require('./template');
var qs = require('querystring');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname; //root디렉토리를 나타내는 값을 가져온다.

    if(pathname === '/'){
      if(queryData.id === undefined){
        fs.readdir('./data',(err,files)=>{
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = templates.templateList(files);
          var template = templates.templateHTML(title, list, `<h2>${title}</h2>${description}`);//``:template Literal를 사용하여 값을 넘겨줄 수도 있다.
          response.writeHead(200);
          response.end(template);
        });
      }
      else {
        fs.readdir('./data',(err,files)=>{
          fs.readFile(`./data/${queryData.id}`,'utf8',(err, description) => {
            var title = queryData.id; //주소의 id값을 가져옴
            var list = templates.templateList(files);
            var template = templates.templateHTML(title, list, `<h2>${title}</h2>${description}`);
            response.writeHead(200);
            response.end(template);
          });
      });
  }
  }else if(pathname === '/create'){
    fs.readdir('./data',(err,files)=>{
      var title = 'WEB - create';
      var list = templates.templateList(files);
      var template = templates.templateHTML(title, list, `
      <form action="http://localhost:3001/create_process" method="POST">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
            <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
            <input type="submit" value="Submit">
        </p>
      </form>
      `);//``:template Literal를 사용하여 값을 넘겨줄 수도 있다.
      response.writeHead(200);
      response.end(template);
    });
  } 
  else if(pathname === '/create_process'){
    var body = '';
    //post방식으로 넘어온 데이터를 받는 방법
    request.on('data',function(data){//data에 데이터를 하나씩 가져오며 콜백함수에 실행시키다가
      body = body + data;
    });
    request.on('end',function(){//없으면 마지막으로 end로 넘어와서 콜백함수를 실행함
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`./data/${title}`,description,'utf8',(err)=>{
        response.writeHead(302, {Location: `/?id=${title}`});
        response.end();
      });
    });
  }
  else{
    response.writeHead(404);
    response.end('Not found');
  }
});

app.listen(3001);