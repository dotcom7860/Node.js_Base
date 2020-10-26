var fs = require('fs');

/*
//readFileSync : 일을 코드 순서대로 처리한다.(필요에 따라 사용한다.)
console.log('A');
var result = fs.readFileSync('./sample.txt', 'utf-8');
console.log(result);
console.log('C');
// result : A result C
*/

//readFile : 시간이 걸리는 일은 돌아가게 냅두고, 먼저 처리할 수 있는 일부터 한다.(개발자들은 이걸 추천한다.)
console.log('A');
fs.readFile('./sample.txt', 'utf-8',(err, result) =>{
    console.log(result);
});
console.log('C');
//result : A C result