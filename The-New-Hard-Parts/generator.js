function *createFlow() {
    const num = 10
    const newNum = yield num
    yield 5 + newNum
    yield 6
}

const returnNextElement = createFlow()
console.log(returnNextElement)
const element1 = returnNextElement.next()
console.log(element1)
const element2 = returnNextElement.next(2)
console.log(element2)
