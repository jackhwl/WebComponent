function EventEmitter() {
    this._events = Object.create(null)
}

// {'brokenup': []}
EventEmitter.prototype.on = function(eventName, callback){
    if (!this._events) this._events = Object.create(null)
    let stack = this._events[eventName] || []
    stack.push(callback)
    this._events[eventName] = stack
}
EventEmitter.prototype.emit = function(eventName, ...args) {
    if(this._events[eventName]){
        this._events[eventName].forEach(cb=>{
            cb(...args)
        })
    }
}
module.exports = EventEmitter