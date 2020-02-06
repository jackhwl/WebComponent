// https://juejin.im/post/5b2f02cd5188252b937548ab
// https://mp.weixin.qq.com/s/4yek2gxbU2JZlQ4_Gx8Ovg

const FUFILLED = 'FUFILLED';
const REJECTED = 'REJECTED';
const PENDING = 'PENDING';

function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        return reject(new TypeError("Chaining cycle detected for promise"));
    }
    let called;
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, err => {
                    if (called) return;
                    called = true;
                    reject(err);
                })
            } else {
                resolve(x);
            }

        }
        catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

class Promise {
    constructor(executor) {
        this.state = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallback = [];
        this.onRejectedCallback = [];

        let resolve = value => {
            if (this.state === PENDING) {
                this.value = value;
                this.state = FUFILLED;
                this.onFulfilledCallback.forEach(fn => fn());
            }
        }
        let reject = reason => {
            if (this.state === PENDING) {
                this.reason = reason;
                this.state = REJECTED;
                this.onRejectedCallback.forEach(fn => fn());
            }
        }

        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
        let promise2 = new Promise((resolve, reject) => {
            if (this.state === FUFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            }
            if (this.state === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            }
            if (this.state === PENDING) {
                this.onFulfilledCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
                this.onRejectedCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
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
//promises-aplus-tests .\w1Promise.js

module.exports = Promise;