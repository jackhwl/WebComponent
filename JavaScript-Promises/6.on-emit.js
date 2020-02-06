let fs = require('fs');
let school = {};
let event = {
    arr:[],
    on(fn) {
        this.arr.push(fn);
    },
    emit(){
        this.arr.forEach(fn=>fn());
    }
};
event.on(function(){
    //subscribe
    console.log('read');
})
event.on(function(){
    //subscribe
    if (Object.keys(school).length === 2){
        console.log(school);
    }
})
 
fs.readFile('./name.txt', 'utf8', function(err, data){
    school['name'] = data;
    event.emit(); // publish
})

fs.readFile('./age.txt', 'utf8', function(err, data){
    school['age'] = data;
    event.emit(); // publish
})