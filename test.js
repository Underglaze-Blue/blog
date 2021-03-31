function f(...parentArgs) {
  const result = [...parentArgs]
  function temp (...args) {
    result.push(...args)
    return temp
  }
  Object.defineProperty(temp, 'value', {
    get: () => result.reduce((res, item) => (res += item ** 2 || 0 , res), 0)
  })
  return temp
}

function f1(a) {
  a = +a || 0
  let value = a * a
  function temp (b) {
    b = +b || 0
    value += b * b
    return temp
  }
  Object.defineProperty(temp, 'value', {
    get: () => value
  })
  return temp
}

console.log(f(1,2,3,4).value)
console.log(f1(1)(2)(3)(4).value)
