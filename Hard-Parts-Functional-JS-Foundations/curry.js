const add = (x, y) => x + y

const flip = f => (y, x) => f(x, y)

const curry = f => x => y => f(x, y)

const uncurry = f => (x, y) => f(x)(y)

const toPair = f => ([x, y]) => f(x, y)

const fromPair = f => (x, y) => f([x, y])

const result = toPair(add)([1, 2])

const result2 = fromPair(toPair(add))(3,2)

console.log(result)
console.log(result2)

const curriedAdd = curry(add)

const increment = curriedAdd(1)

const result3 = increment(5)
console.log(result3)

const modulo = curry((x, y) => y % x)

const isOdd = modulo(2) // (2, y) => 2 % y
const result4 = isOdd(3)
console.log(result4)