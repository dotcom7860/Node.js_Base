//ex)node conditional.js KangMan이라는 명령어를 터미널로 실행시키면
//배열의 첫번째는 node라는 프로그램의 실행 경로, 
//두번째는 conditional.js 파일의 실행 경로,
//그 뒤로는 터미널에서 넣은 KangMan이라는 단어가 나온다.
var args = process.argv; //그것이 process라는 명령어이다.

console.log(args[2]); 
