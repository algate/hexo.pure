title: arguments.callee
date: 2018-04-14 10:46:30
categories:
- Javascript
tags:
- 递归
- arguments.callee
---

arguments是JS的一个内置（隐藏）的对象，当在调用函数时，就会实例化出这个对象，而arguments.callee是一个指向正在执行的函数的指针，这样就可以通过arguments.callee来调用函数，尤其是在编写递归函数的时候。
在函数内部，有两个特殊的对象：arguments 和 this。其中， arguments 的主要用途是保存函数参数， 但这个对象还有一个名叫 callee 的属性，该属性是一个指针，指向拥有这个 arguments 对象的函数。 请看下面这个非常经典的阶乘函数

    function factorial(num){
       if (num <=1) {
          return 1;
       } else {
       return num * factorial(num-1)
       }
    }
>如果像下面这样使用它，则会出错：
var fcopy = factorial;
factorial = null;
alert(fcopy(3));
因为fcopy指向的函数实体调用了factorial，而factorial已经被释放。
解决有下边两种办法

<!-- more -->

* 1.定义阶乘函数一般都要用到递归算法；如上面的代码所示，在函数有名字，而且名字以后也不会变的情况下，这样定义没有问题。但问题是这个函数的执行与函数名 factorial 紧紧耦合在了一起。为 了消除这种紧密耦合的现象，可以像下面这样使用 arguments.callee

    function factorial(num){
       if (num <=1) {
          return 1;
       } else {
       return num * arguments.callee(num-1);
       }
    }

在这个重写后的 factorial()函数的函数体内，没有再引用函数名 factorial。这样，无论引用函数时使用的是什么名字，都可以保证正常完成递归调用。例如

    function factorial(num){
        if(num <= 1){
            return 1;
        }else{
            return num * arguments.callee(num-1);
        }
    }
    var trueFactorial = factorial;
    alert(trueFactorial(5));    //120


    factorial = function() {
        return 0;
    }
    alert(trueFactorial(5));// 120 如果没有使用arguments.callee，将返回0

* 2.使用函数表达式

    var factorial = (function f(n){
      if (n<=1)
      {
        return 1;
      }else{
        return f(n-1)*n;
      }
    })
    >这并非使用了什么新的技术，只是在原来概念上的一种应用，在定义 factorial 时，直接创建一个函数，再将此函数的引用赋值给factorial。
