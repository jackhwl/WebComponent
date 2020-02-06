function deepClone(obj, hash = new WeakMap()) {
    if (obj == null) return obj; //null undefined is equal when use ==
    if (typeof obj !== 'object') return obj;  // string number boolean symbol function
    //if (obj instanceof RedExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);

    let val = hash.get(obj);
    if (val) return val;
    let cloneObj = new obj.constructor;
    hash.set(obj, cloneObj);
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key], hash);
        }
    }

    return cloneObj;

}

let r  = ['name', 'jack', 'age', [10,45,[6,7,8]]];
let reg = deepClone(r);
console.log(reg);

let obj1 = {a: 1};
obj1.b = obj1;
console.log(deepClone(obj1));
