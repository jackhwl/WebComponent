// We could generalize our function so that we pass in our  specific instruction only when 
// we run the copyArrayAndManipulate function!

const copyArrayAndManipulate = (array, instructions) => {
    const output = []
    for (let i=0; i < array.length; i++){
        output.push(instructions(array[i]))
    }
    return output
}

const multiplyBy2 = (input) => {
    return input * 2
}

const result = copyArrayAndManipulate([1, 2, 3], multiplyBy2)