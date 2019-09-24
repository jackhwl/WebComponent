let fs = require('fs');
function read(filename, encoding) { 
    return new Promise((resolve, reject) => {
        fs.readFile(filename, encoding, function(err, data){
            if (err) reject(err);
            resolve(data);
            //reject(data);
        })
    })
}

read('./name.txt', 'utf8')
    .then(data => {
        //read(data+1, 'utf8'
        return 123;
},
        err=> {
            console.log('err1 = ', err);
            //throw err;
            return new Promise(()=>{}); // terminate promise by return a promise without resolve and reject.
        })
    .then(data => console.log('success', data),
        err=> console.log('err2 = ', err))