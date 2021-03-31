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
    temp.value = value
    return temp
  }
  temp.value = value
  return temp
}
```

充分利用了闭包的概念，和它类似的还有实现斐波那契数列

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
