const PENDING = 'PENDING';
const RESOLVE = 'RESOLVE';
const REJECT = 'REJECT';
class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        
        let resolve = value => {
            if (this.status == PENDING) {
                this.status = RESOLVE;
                this.value = value;
            }
        };

        let reject = reason => {
            if (this.status == PENDING) {
                this.status = REJECT;
                this.reason = reason;
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
            
        }
    }
}

module.exports = Promise;