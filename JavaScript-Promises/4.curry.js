function checkType(type, value){
    return Object.prototype.toString.call(value) === `[object ${type}]`
}

let isString = curring(checkType)('String');
isString('hello');

let util = {};
let types = ['String', 'Number', 'Boolean', 'Null', 'Undefined'];
types.forEach(type => {
    util[`is${type}`] = curring(checkType)(type);
})
console.log(util.isString('hello'));


function add(a, b, c, d, e) {
    return a + b + c + d + e;
}

function curring(fn, arr = []) {
    let len = fn.length;
    return function (...args) {  //[1,2]
        arr = arr.concat(args); // arr = [...arr, ...args]
        if (arr.length < len) {
            return curring(fn, arr);
        } else {
            return fn(...arr);
        }
    }
}

let r = curring(add)(1, 2)(3)(4, 5);
console.log(r);

// anti curry
// turn Object.prototype.toString.call(value)
// to toString('hello');