//refactoring : 코드의 결과와는 상관없지만 내부의 코드 구조가 효율적으로 바뀌는 것
module.exports = {
    html:function(title, list,body,control){
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
          ${control}
          ${body}
        </body>
        </html>
        `;
    },
    list:function (files){
        var list = '<ul>';
        files.forEach(file => { //forEach : 배열을 가져와서 배열 끝까지 돌림. file = element : 배열 각각의 값
            list = list + `<li><a href='/?id=${file}'>${file}</a></li>`
        });
        list = list +'</ul>';
        return list;
    }
}