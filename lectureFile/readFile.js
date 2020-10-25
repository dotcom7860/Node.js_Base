const fs = require('fs');

fs.readFile('./sample.txt','utf8',(err, data)=>{ //해당 파일을 읽어옴
    console.log(data);
});