const PENDING = 'PENDING';
const RESOLVE = 'RESOLVE';
const REJECT = 'REJECT';
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
        if (this.status == RESOLVE) {
            return onfufilled(this.value);
        }
        if (this.status == REJECT) {
            return onrejected(this.reason);
        }
        if (this.status == PENDING) {
            this.resolveCallbacks.push(() => onfufilled(this.value));
            this.rejectCallbacks.push(() => onrejected(tihs.reason));
        }
    }
}

module.exports = Promise;