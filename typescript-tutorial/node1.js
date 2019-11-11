const EventEmitter = require('./events')
const util = require('util')
function Girl() {

}

// Girl.prototype.__proto__ = EventEmitter.prototype
// Object.setPrototypeOf(Girl.prototype, EventEmitter.prototype)
util.inherits(Girl, EventEmitter)
let girl = new Girl

// girl.on('newListener', function(type){
//     process.nextTick(()=>{
//         girl.emit(type);
//     })
// })
girl.on('brokeup', () => console.log('cry'))
girl.on('brokeup', () => console.log('eat'))
girl.emit('brokeup')