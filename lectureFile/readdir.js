const CurFolder = './';
const fs = require('fs');

fs.readdir(CurFolder, (err, files) => { //파일의 목록을 배열로 가져옴
    console.log(files);
});
//ex)
/*
    var list = `<ul>
    <li><a href="/?id=HTML">HTML</a></li>
    <li><a href="/?id=CSS">CSS</a></li>
    <li><a href="/?id=JavaScript">JavaScript</a></li>
  </ul>`;
//위와 같은 소스를 좀 더 효율적으로 revise
fs.readdir('./data',(err,files)=>{
    console.log(files);
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = '<ul>';
    files.forEach(file => { //forEach : 배열을 가져와서 배열 끝까지 돌림. file = element : 배열 각각의 값
      list = list + `<li><a href='/?id=${file}'>${file}</a></li>`
    });
    list = list +'</ul>';
});
*/