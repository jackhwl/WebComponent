function Animal() {
    this.name = "animal";
}
Animal.prototype.say = function() {
    console.log('ooooo');
}

function Tiger() {
    Animal.call(this);
}

let tiger = new Tiger();
console.log(tiger.name);