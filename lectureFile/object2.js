// array, object

//var i = if(true){console.log(1);} X

//var w = while(true){console.log(1);} X

var f = function(){
    console.log('A');
    console.log('B');
}
f(); // O
//이렇게도
var a = [f];
a[0]();
//저렇게도 쓸 수 있음
var o = {
    func:f
}

o.func();