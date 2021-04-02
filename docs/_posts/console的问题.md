---
title: console的问题
date: 2021-04-02 23:52:53
permalink: /pages/f6e1b8/
sidebar: auto
categories:
  - 随笔
tags:
  - 
---
# console的问题 

```js
function sayHi() {
  console.log(name)
  console.log(age)
  var name = 'Lydia'
  let age = 21
}

sayHi()
```

对于以上代码，熟悉js的人都会知道，结果为 undefined 和 暂时性死区报错

<img  :src="$withBase('/assets/console_1.png')" />

结果也确实如此，是因为 js 会存在声明提升，而 let 存在暂时性死区，在定义之前引用会报错，这里在执行上下文中， var 定义的变量会放到变量环境中，let 定义的会存在于词法环境，关于这里具体的问题可以搜索执行上下文查看，这里主要要说的不是这个问题

对于这段代码，没有任何疑问，然后我突发奇想，如果将 name 的 var 去掉会怎么样，是不是两个都会报错，然后我在 chrome 的 控制台修改了这段代码，并重新输出了结果

<img  :src="$withBase('/assets/console_2.png')" />

嗯？

并没有报错，输出了一个空白，和暂时性死区的报错，这是为什么，看一下这个空白是什么类型的，于是我又修改代码

<img  :src="$withBase('/assets/console_3.png')" />

可以看到 name 是 string 类型的，在这里我陷入了沉思

难道 因为 在下面 name 赋值为 string 类型，所以这里是 string 类型吗？

还是说 这里的 name 因为没有声明，所以系统默认给了 var ？ 但是系统默认给 var 应该是 undefined ，为什么会是 string 类型的？

于是带着疑问，首先，我将 name 的赋值 改为 number 类型

<img  :src="$withBase('/assets/console_4.png')" />

将 name 的赋值改为 number 之后，输出的类型依旧是 string 类型

于是我在想，难道是因为 let 的报错，导致的这里出了问题？

尝试修改后 

<img  :src="$withBase('/assets/console_5.png')" />

可以看到 ，去掉打印 let 值的那一行之后，依旧是 string 类型，为 空，没有变化

再次执行，打印的值为 3 ，值改变了

<img  :src="$withBase('/assets/console_6.png')" />

但是，问题还是没有解决，为什么，一开始打印的 name 是 string 类型的，而不是其他的呢？这里到底是不是声明提升的问题？

带着疑问，总觉得浏览器的 控制台，每次清空需要刷新页面，所以 换到了 node 环境执行一开始的代码

<img  :src="$withBase('/assets/console_7.png')" />

嗯？？？？

满头的问号，node 环境下，怎么就直接报错了？ 难道 name 没有声明提升吗？

```js
ReferenceError: name is not defined
```

于是尝试换了变量在 chrome 的环境中 尝试 

<img  :src="$withBase('/assets/console_8.png')" />

这次在 chrome 环境中，也报错了……

开始思考……

如果是这样子的话，那么应该是 name 的问题

但是 全局没有定义 name 为什么会有这个问题呢 ，就像全局也没有定义 test，为什么 name 不报错， test 就会报错

突然想到，执行上下文 和 作用域链 

name 我们是没有定义，所以 代码执行时，会向上查找……  那么 这一段代码的上一层，是 全局环境

在 浏览器中，我们定义在全局的 var 变量，会挂载到 window 上，打印一下 window 试试看

<img  :src="$withBase('/assets/console_9.png')" />

果然，全局的 window 中，存在 name 属性，按照这个结论，来分析代码的执行

也就是说，在 sayHi 函数中，在 console name 时，sayHi 内部的 name 并没有声明提升，这里的 name 会取全局作用域也就是 window 中的 name

而非特殊情况，window 的 name 就是一个空字符串，所以打印出来是 string 类型，同时  window 的 name 也可以用来做跨域，刷新和改变 url 都不会清空 name 值

至于我们一开始 修改 name 为 数字时，为什么第二次打印还是 空字符串，那是因为 let 的暂时性死区报错，导致我们修改 name 的值失败

**至此，问题完美解决，在我们平时工作时，习惯性的会通过 chrome 的 控制台来调试代码，但是如果碰到这种情况，可能会得到错误的结论，有时候 应该尽量避免和 window 中的 变量名重复，有可能会得到错误的结果，影响理解**

同时，在解决这个问题时，也查看了 node 的console，发现和 浏览器的实现不一致，这个放到后面有时间再写文档吧~ 
