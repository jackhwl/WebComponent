class Subject {  // 被观察者
    constructor(){
        this.arr = []; // store observer instance
        this.state = 'happy';
    }
    setState(newState){
        this.state = newState;
        this.arr.forEach(o=>o.update(this));
    }
    attach(o) {
        this.arr.push(o);
    }
}

class Observer { // 观察者
    constructor(name){
        this.name = name;
    }
    update(s){
        console.log(s.state + ' to ' + this.name);
    }
}

let s = new Subject('baby');
let o1 = new Observer('dad');
let o2 = new Observer('mom');

s.attach(o1);
s.attach(o2);
s.setState('not happy');