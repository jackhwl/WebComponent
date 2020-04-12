// Introducing Web Browser APIs/Node background threads

function printHello() {
    console.log('Hello')
}

setTimeout(printHello, 1000);

console.log('Me first!')

// We're interacting with a world outside of JavaScript now - so we need rules
 