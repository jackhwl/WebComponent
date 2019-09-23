
let Promise = require('./promise');
let p = new Promise((resolve, reject) => {
    console.log(1);
    setTimeout(() => resolve('got bonus'), 1000);
    //throw new Error('nnetwork fail');
    //reject('no bonus');
});
console.log(2);
p.then((data)=>{
    console.log('success:', data);
    
},(reason)=>{
    console.log('fail:', reason);

});


p.then((data)=>{
    console.log('success:', data);
    
},(reason)=>{
    console.log('fail:', reason);

});

console.log('the end');
