function checkType0(value, type){
    return Object.prototype.toString.call(value) === `[object ${type}]`
}

function checkType(type) {
    return function(value) {
        return Object.prototype.toString.call(value) === `[object ${type}]`
    }
}

let isString = checkType('String');
console.log(checkType0('hello', 'String'));
console.log(checkType0('hello1', 'Stiring'));

console.log(isString('hello'));

let isNumber = checkType('Number');

console.log(isNumber(123));
