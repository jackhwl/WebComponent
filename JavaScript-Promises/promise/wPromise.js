const PENDING = 'PENDING';
const RESOLVE = 'RESOLVE';
const REJECT = 'REJECT';

class Promise {
    constructor(executor) {
        this.state = PENDING;
        this.value = undefined;
        this.reason = undefined;

        let resolve = (value) => {
            this.state = RESOLVE;
            this.value = value;
        }

        let reject = (reason) => {
            this.state = REJECT;
            this.reason = reason;
        }

        executor(resolve, reject);
    }

    then(onFufilled, onRejected) {
        if (this.state === RESOLVE) {
            onFufilled(this.value);
        }
        if (this.state === REJECT) {
            onRejected(this.reason);
        }
    }
}

module.exports = Promise;