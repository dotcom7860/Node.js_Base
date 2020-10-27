var members = ['kim','pack','lee'];

members.forEach(element => {
    console.log('array roof',element);
});

var roles = {
    'programmer':'kim',
    'designer' : 'pack',
    'manager' : 'lee'
}
console.log(roles.designer);

for(var name in roles){
    console.log('object => ', name, 'value => ',roles[name]);
}