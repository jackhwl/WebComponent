// https://bevacqua.github.io/promisees/#
function echo(message, delay) {
    if (!delay) {
        delay = 0;
    }
    return new Promise(function echo(fulfill, reject) {
        if (delay < 0) {
            reject('Error echoing: ' + message);
        }
        setTimeout(() => fulfill(message), delay);
    });
};

var log = r => {
    console.log(r);
    return r;
}
var error = r => {
    console.error(r);
    throw r;
}

var p = echo('chain', -1);
p.then(log).then(log);
p.then(log).catch(error);
p.then(log).then(log).then(log).catch(error);

Promise.all([
    echo('first'),
    echo('second'),
    echo('third')
]).then(log);

Promise.race([
    echo('first', 200),
    echo('second', 4000),
    echo('third', 2000)
]).then(log);

