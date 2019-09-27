console.log(a);
var a = 1, b=2;
console.log(b);

//let {name: name1, add= 'address'} = {name:'jack', age:42};
//console.log(name1, add);

let obj = { name: 'zf', age: {a: 1}};
let newObj = {...obj};
newObj.name = 'jack';
newObj.age.a = 200;
console.log(obj);