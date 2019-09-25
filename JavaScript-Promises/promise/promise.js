const PENDING = 'PENDING';
const RESOLVE = 'RESOLVE';
const REJECT = 'REJECT';

function resolvePromise(promise2, x, resolve, reject) {
    
}

class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.resolveCallbacks = [];
        this.rejectCallbacks = [];
        
        let resolve = value => {
            if (this.status == PENDING) {
                this.status = RESOLVE;
                this.value = value;
                this.resolveCallbacks.forEach(fn => fn());
            }
        };

        let reject = reason => {
            if (this.status == PENDING) {
                this.status = REJECT;
                this.reason = reason;
                this.rejectCallbacks.forEach(fn => fn());
            }
        }

        try {
            executor(resolve, reject);
        } catch(e){
            reject(e);
        }
    }

    then(onfufilled, onrejected) {
        let promise2 = new Promise((resolve, reject) => {
            if (this.status == RESOLVE) {
                try{
                    let x = onfufilled(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            }
            if (this.status == REJECT) {
                try{
                    let x = onrejected(this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            }
            if (this.status == PENDING) {
                this.resolveCallbacks.push(() => {
                    try{
                        let x = onfufilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                });
                this.rejectCallbacks.push(() => {
                    try{
                        let x = onrejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                });
            }
        });


        return promise2;
    }
}

module.exports = Promise;