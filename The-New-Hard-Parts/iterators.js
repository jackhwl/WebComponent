// We regularly have lists or collections or data where we want to 
// go through each item and do something to each element

const numbers = [4, 5, 6]

for (let i=0; i<numbers.length; i++){
    console.log(numbers[i])
}

// We're going to discover there's a new beautiful way of thinking about using 
// each element one-by-one

// Functions can be returned from other functions in JavaScript!

function createNewFunction() {
    function add2(num) {
        return num+2
    }
    return add2
}

const newFunction = createNewFunction()
const result = newFunction(3)

// How can we run/call add2 now? Outside of createNewFunction?