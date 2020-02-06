
Function.prototype.before = function(cb){
    return (...args) => { // turn args to array
        cb();
        this(...args);  //spread array to args
    }
}
function makeCoffee(who) {
    console.log('make a coup of coffee for ', who);
}

let newFunc = makeCoffee.before(function(){
    console.log('add a spoon of suggar');
})
let newFunc1 = makeCoffee.before(function(){
    console.log('add a spoon of milk');
})
newFunc('Jack');
newFunc1('Tom');