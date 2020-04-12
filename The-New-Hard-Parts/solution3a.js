// Problems:
// 99% of developers have no idea how they're working under the hood;
// Debugging becomes super-hard

// Benefits
// Cleaner readable style with pseudo-synchronous style code
// Nice error handleing process

// But we need to know how our promise-deferred functionality gets back into JavaScript to be run

function display(data) {console.log(data)}
function printHello(){console.log('Hello')}
function blockFor300ms(){/* blocks js thread for 300ms with long for loop */}

setTimeout(printHello, 0)

const futureData = fetch('https://twitter.com/will/tweets/1')
futureData.then(display)

blockFor300ms()

// Which will run first?

console.log('Me first!')

// We need a way of queuing up all this deferred functionality

// Micro task Queue (Job Queue), Callback Queue (task Queue)

// https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/

// Promises, Web APIs, the Callback & Microtask Queues and Event loop allow us to
// defer our actions until the 'work'(an API request, timer etc) is completed and 
// continue running our code line by line in the meantime

// Asynchronous Javascript is the backbone of the modern web - letting us build
// fast 'non-blocking'