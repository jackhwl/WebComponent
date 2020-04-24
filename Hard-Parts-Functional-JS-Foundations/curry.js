const add = (x, y) => x + y

const toPair = f => ([x, y]) => f(x, y)

const fromPair = f => (x, y) => f([x, y])

const result = toPair(add)([1, 2])

const result2 = fromPair(toPair(add))(3,2)
console.log(result)
console.log(result2)
