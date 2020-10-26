/*
function a(){
    console.log('A');
}
*/
var a = function(){
    console.log('A');
}

function slowfunc(callback){ //함수 내부에서 함수를 실행
    callback();
}

slowfunc(a);