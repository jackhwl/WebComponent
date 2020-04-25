const {curry} = require('ramda')

const add = (x, y) => x + y

const flip = f => (y, x) => f(x, y)

//const curry = f => x => y => f(x, y)
const curry2 = function(f) {
    return function(x) {
        return function (y) {
            return f(x, y)
        }
    }
}
 

const toPair = f => ([x, y]) => f(x, y)
const toPair2 = function(f) {
    return function([x, y]) {
        return f(x, y)
    }
}

const fromPair = f => (x, y) => f([x, y])

const result = toPair2(add)([1, 20])

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

const filter = curry((f, xs) => xs.filter(f))

const getOdds = filter(isOdd)

const result5 = getOdds([1, 2, 3, 4, 5])

console.log(result5)

const replace = curry((regex, replacement, str) => str.replace(regex, replacement))

const replaceVowels = replace(/[AEIOU]/ig, '!')

const result6 = replaceVowels('Hey I have words')
console.log(result6)