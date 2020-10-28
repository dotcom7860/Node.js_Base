//module(기본적으로 제공하는 기능들을 묶어놓은 것)을 가져옴
var http = require('http');
var fs = require('fs'); //file System
var url = require('url'); //require : 요구하다,가져오다
var templates = require('./lib/templates.js');
var qs = require('querystring');
var path = require('path'); //사용자로부터 입력된 데이터를 보호하기 위해 사용한다.
var sanitizeHtml = require('sanitize-html'); //출력되는 데이터를 필터링하기 위해 사용한다.

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname; //root디렉토리를 나타내는 값을 가져온다.

    if(pathname === '/'){
      if(queryData.id === undefined){
        fs.readdir('./data',(err,files)=>{
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = templates.list(files);
          var html = templates.html(title, list, `<h2>${title}</h2>${description}`,`<a href="./create">create</a>`);//``:template Literal를 사용하여 값을 넘겨줄 수도 있다.
          response.writeHead(200);
          response.end(html);
        });
      }
      else {
        fs.readdir('./data',(err,files)=>{
          filteredId = path.parse(queryData.id).base;
          fs.readFile(`./data/${filteredId}`,'utf8',(err, description) => {
            var title = queryData.id; //주소의 id값을 가져옴
            var sanitizedTitle = sanitizeHtml(title); //코드를 소독한다.(<script>와 같은 태그들이 작동하지 않도록)
            var sanitizedDescription = sanitizeHtml(description,{allowedTags:['h1']}); //allowedTags : 해당 태그 허용 
            var list = templates.list(files);
            var html = templates.html(sanitizedTitle, list, `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
            `<a href="/create">create</a> 
            <a href="/update?id=${sanitizedTitle}">update</a> 
            <form action="/delete_process" method="post">
              <input type="hidden" name="id" value="${sanitizedTitle}">
              <input type="submit" value="delete">
            </form>
            `);
            response.writeHead(200);
            response.end(html);
          });
      });
  }
  }else if(pathname === '/create'){
    fs.readdir('./data',(err,files)=>{
      var title = 'WEB - create';
      var list = templates.list(files);
      var html = templates.html(title, list, `
      <form action="/create_process" method="POST">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
            <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
            <input type="submit" value="Submit">
        </p>
      </form>
      `,'');//``:template Literal를 사용하여 값을 넘겨줄 수도 있다.
      response.writeHead(200);
      response.end(html);
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
  }else if(pathname === '/update'){
    fs.readdir('./data',(err,files)=>{
      filteredId = path.parse(queryData.id).base;
      fs.readFile(`./data/${filteredId}`,'utf8',(err, description) => {
        var title = queryData.id; //주소의 id값을 가져옴
        var list = templates.list(files);
        var html = templates.html(title, list, 
          `
          <form action="/update_process" method="POST">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value=${title}></p>
          <p>
              <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
              <input type="submit" value="Submit">
          </p>
        </form>
        `,`<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
        response.writeHead(200);
        response.end(html);
      });
  });
  }else if(pathname === '/update_process'){
    var body = '';

    request.on('data',function(data){
      body = body + data;
    });
    request.on('end',function(){
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`, `data/${title}`,function(err){
        console.log(err);
      })
      fs.writeFile(`./data/${title}`,description,'utf8',(err)=>{
        response.writeHead(302, {Location: `/?id=${title}`});
        response.end();
      });
    });
  }else if(pathname === '/delete_process'){
    var body = '';

    request.on('data',function(data){
      body = body + data;
    });
    request.on('end',function(){
      var post = qs.parse(body);
      var id = post.id;
      filteredId = path.parse(id).base;
      fs.unlink(`data/${filteredId}`,(err)=>{ //파일을 삭제할 때 사용(삭제할 파일,(콜백함수))
        response.writeHead(302, {Location: `/`});
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