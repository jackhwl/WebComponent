
＃ Promise visulazation
https://bevacqua.github.io/promisees

codepen.io

// intead of 
new Promise(function(fulfill, reject){
    fulfill(someValue);
});

// use
Promise.resolve(someValue);


// intead of 
new Promise(function(fulfill, reject){
    reject(someError);
});

// use
Promise.reject(someError);

// use || inline return
getCurrentPositionWithPromise()
    .then(r => console.log(r.coords.longitude) || r)


site script: site.js
sw script: installation.js