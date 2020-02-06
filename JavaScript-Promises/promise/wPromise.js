// https://juejin.im/post/5b2f02cd5188252b937548ab
// https://mp.weixin.qq.com/s/4yek2gxbU2JZlQ4_Gx8Ovg

const PENDING = 'PENDING';
const RESOLVE = 'RESOLVE';
const REJECT = 'REJECT';

function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        return reject(new TypeError("Chaining cycle detected for promise #<Promise>"));
    }
    let called; 
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        try {
            // 2.3.3.1, 2.3.3.2 If retrieving the property x.then results in a thrown exception e, reject promise with e as the reason.
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y=>{
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, r=>{
                    if (called) return;
                    called = true;
                    reject(r);
                });
            } else {
                resolve(x); //normal value
            }
        } catch(e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x); //normal string, number, bool, synbol 
    }
}

class Promise {
    constructor(executor) {
        this.state = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks  = [];
        this.onRejectedCallbacks  = [];

        let resolve = (value) => {
            // if(value instanceof Promise){ // 不能判断有没有then 否则测试过不去
            //     return value.then(resolve,reject); // 递归
            // }
            if (this.state === PENDING) {
                this.value = value;
                this.state = RESOLVE;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        };

        let reject = (reason) => {
            if (this.state === PENDING) {
                this.reason = reason;
                this.state = REJECT;
                this.onRejectedCallbacks .forEach(fn => fn());
            }
        };

        try{
            executor(resolve, reject);
        } catch(e) {
            reject(e);
        }

    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val=>val;
        onRejected = typeof onRejected === 'function' ? onRejected : err=>{throw err};
        let promise2 = new Promise((resolve, reject) => {
            if(this.state === RESOLVE) {
                setTimeout(() => {
                    try{
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                });
            }
            if(this.state === REJECT) {
                setTimeout(() => {
                    try{
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(e){
                        reject(e);
                    }
                });
            }
            if(this.state === PENDING) {
                this.onResolvedCallbacks.push(() => { 
                    setTimeout(() => {
                        try{
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch(e) {
                            reject(e);
                        }
                    });
                });
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try{
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch(e){
                            reject(e);
                        }
                    });                        
                });
            }
        });

        return promise2;
    }
}

Promise.defer = Promise.deferred = function() {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}
//promises-aplus-tests .\wPromise.js
module.exports = Promise;