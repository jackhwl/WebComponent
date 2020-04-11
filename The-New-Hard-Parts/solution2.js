// Introducing Web Browser APIs/Node background threads

function printHello() {
    console.log('Hello')
}

setTimeout(printHello, 1000);

console.log('Me first!')