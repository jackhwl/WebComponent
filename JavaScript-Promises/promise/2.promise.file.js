let fs = require('fs');
let Promise = require('./wPromise');

function read(filename, encoding) { 
    return new Promise((resolve, reject) => {
        fs.readFile(filename, encoding, function(err, data){
            if (err) reject(err);
            resolve(data);
            //reject(data);
        })
    })
}

let p = new Promise((resolve, reject) => {
    resolve();
});
let p2 = p.then(()=> {
    console.log(1);
    return p2;
});
p2.then(()=>{}, (err)=>{
    console.log(err);
})

read('./name.txt', 'utf8').then(data => {
    //throw new Error('123');
     // return read(data, 'utf8');
    // .then(data => {
    //     console.log(data);
    // })
        return 123;
},
err=> {
    console.log('err1 = ', err);
    //throw err;
    return new Promise(()=>{}); // terminate promise by return a promise without resolve and reject.
})
.then(data => console.log('success', data),
        err => console.log('err2 = ', err))