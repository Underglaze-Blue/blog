---
title: js有意思的问题
date: 2021-03-31 16:31:13
permalink: /pages/6f787e/
sidebar: auto
categories:
  - 随笔
tags:
  - 
---
# js有意思的问题 

::: tip
实现这样一个函数，输出结果如下：
```js
f(1) == 1
f(1)(2) == 5
f(1)(2)(3) == 14
```
:::

```js
function f(a) {
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
```

这里实现，每次是先计算结果，然后返回函数，下面的方法是先保留数据，然后后计算结果，相比较而言下面的方式更合理，下面的方式 支持多个参数

```js
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
```

充分利用了闭包还有 `getter` 的概念，和它类似的还有实现斐波那契数列

```js
function fib() {
  let a = 1;
  let b = 1;
  function temp () {
    [a, b] = [b, a + b]
    temp.value = a
    return temp
  }
  temp.value = a
  return temp
}
```

斐波那契数列这里也是这种思路，使用了解构赋值进行值的交换
