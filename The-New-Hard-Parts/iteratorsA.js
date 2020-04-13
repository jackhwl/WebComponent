// We want to create a function that holds both our array, 
// the position we are currently at in our 'stream' of elements 
// and has the ability to return the next element

function createFunction(array){
    let i = 0
    function inner(){
        const element = array[i]
        i++
        return element
    }
    return inner
}

const returnNextElement = createFunction([4, 5, 6])

// How can we access the first element of our list?

// The bond
// When the function inner is defined, it gets a bond to the surrounding Local Memory in which it has been defined
// When we return out inner, that surrounding live data is returned out too - attached on the 'back' of the function
// definition itself(which we now give a new global label returnNextElement)
// When we call returnNextElement and don't find array or i in the immediate execution context, we look into the
// function definition's 'backpack' of persistent live data
// The 'backpack' is officially known as the C.O.V.E. or 'closure'

// returnNextElement has everything we need all bundled up in it
// Out underlying array itself
// The position we are currently at in our 'stream' of elements
// The ability to return the next element

// This relies completely on the special property of functions in javascript that when they are born inside other functions and returned
// they get a backpack(closure)

// What is the posh name for returnNextElement?
// iterator

// So iterators turn our data into 'streams' of actual values we can access one after another.