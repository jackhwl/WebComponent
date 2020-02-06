function perform(cb, arr){
    return function() {
        arr.forEach(wrapper => wrapper.initialize());
        cb();
        arr.forEach(wrapper => wrapper.close());
    }
}

let newFunc = perform(function(){
    console.log('normal function, core functionality');
}, [
    { // wrapper1
        initialize(){
            console.log('wrapper 1 start')
        },
        close(){
            console.log('wrapper 1 close')
        }
    },
    { // wrapper2
        initialize(){
            console.log('wrapper 2 start')
        },
        close(){
            console.log('wrapper 2 close')
        }
    }
])

newFunc();