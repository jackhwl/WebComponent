
let Promise = require('./wPromise');

let p = new Promise((resolve, reject) => {
    //console.log(1);
    //throw new Error('network fail');
    //resolve('got bonus');
    //reject('no bonus');
    //setTimeout(() => resolve('got bonus'), 1000);
    //setTimeout(() => reject('no bonus'), 1000);
    //setTimeout(() => throw new Error('network fail'), 1000);
});
// console.log(2);
p.then((data)=>{
    console.log('success:', data);
    
},(reason)=>{
    console.log('fail:', reason);

});


// p.then((data)=>{
//     console.log('success:', data);
    
// },(reason)=>{
//     console.log('fail:', reason);

// });

//console.log('the end');
