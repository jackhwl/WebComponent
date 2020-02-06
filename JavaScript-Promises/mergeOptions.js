function mergeOptions(obj1, obj2) {
    if ( obj1 == null) return obj2;
    //if (typeof obj1 !== 'object') return {obj1, ...mergeOptions(null, obj2)}; 
    let objMerge = {};
    for(let key in obj1) {
        if(obj1.hasOwnProperty(key)) {
            if (obj2.hasOwnProperty(key)) {
                if (typeof obj1[key] !== 'object') {
                    objMerge[key] = obj2[key];
                } else {
                    if (typeof obj2[key] !== 'object') {
                        objMerge[key] = obj2[key];
                    } else {
                        objMerge[key] = mergeOptions(obj1[key], obj2[key]);
                    }    
                }
            } else {
                objMerge[key] = obj1[key];
            }
        }
    }
    for(let key in obj2) {
        if(obj2.hasOwnProperty(key)) {
            if (!obj1.hasOwnProperty(key)) {
                objMerge[key] = obj2[key];
            }
        }
    }    
    return objMerge;
}

const obj1 = {age: 20, name: 'wenlin', ob: {a:1}, ar: [1,2]};
const obj2 = {type: 'admin', name: 'huang', ob: {b:2}, ar: [3,4]};

const obj3 = mergeOptions(obj1, obj2);
console.log(obj3);