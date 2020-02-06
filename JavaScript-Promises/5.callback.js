 let fs = require('fs');

 let school = {};

 function after(times, cb){
     return function(){
         if(--times === 0){
             cb();
         }
     }
 }
 let out = after(2, function() {
     console.log(school);
 });

 fs.readFile('./name.txt', 'utf8', function(err, data){
     school['name'] = data;
     out();
 })

 fs.readFile('./age.txt', 'utf8', function(err, data){
     school['age'] = data;
    out();
})
