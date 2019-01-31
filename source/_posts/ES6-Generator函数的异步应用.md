title: ES6-Generator 函数的异步应用
date: 2018-04-19 18:00:30
categories:
- Es6
tags:
- Generator
---

异步编程对 JavaScript 语言太重要。Javascript 语言的执行环境是“单线程”的，如果没有异步编程，根本没法用，非卡死不可。本章主要介绍 Generator 函数如何完成异步操作。

传统方法
ES6 诞生以前，异步编程的方法，大概有下面四种。

 - 回调函数
 - 事件监听
 - 发布/订阅
 - Promise 对象
Generator 函数将 JavaScript 异步编程带入了一个全新的阶段。

<!-- more -->
形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。

    function* helloWorldGenerator() {
      yield 'hello';
      yield 'world';
      return 'ending';
    }

    var hw = helloWorldGenerator();

然后，Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是上一章介绍的遍历器对象（Iterator Object）。

下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。换言之，Generator函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。

    hw.next()
    // { value: 'hello', done: false }

    hw.next()
    // { value: 'world', done: false }

    hw.next()
    // { value: 'ending', done: true }

    hw.next()
    // { value: undefined, done: true }

Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数。

    function* f() {
      console.log('执行了！')
    }

    var generator = f();

    setTimeout(function () {
      generator.next()
    }, 2000);

上面代码中，函数f如果是普通函数，在为变量generator赋值时就会执行。但是，函数f是一个 Generator 函数，就变成只有调用next方法时，函数f才会执行。

另外需要注意，yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。

    var arr = [1, [[2, 3], 4], [5, 6]];

    var flat = function* (a) {
      a.forEach(function (item) {
        if (typeof item !== 'number') {
          yield* flat(item);
        } else {
          yield item;
        }
      });
    };

    for (var f of flat(arr)){
      console.log(f);
    }
上面代码也会产生句法错误，因为forEach方法的参数是一个普通函数，但是在里面使用了yield表达式（这个函数里面还使用了yield\*表达式，详细介绍见后文）。一种修改方法是改用for循环。

    var arr = [1, [[2, 3], 4], [5, 6]];

    var flat = function* (a) {
      var length = a.length;
      for (var i = 0; i < length; i++) {
        var item = a[i];
        if (typeof item !== 'number') {
          yield* flat(item);
        } else {
          yield item;
        }
      }
    };

    for (var f of flat(arr)) {
      console.log(f);
    }
    // 1, 2, 3, 4, 5, 6

另外，yield表达式如果用在另一个表达式之中，必须放在圆括号里面。

    function* demo() {
      console.log('Hello' + yield); // SyntaxError
      console.log('Hello' + yield 123); // SyntaxError

      console.log('Hello' + (yield)); // OK
      console.log('Hello' + (yield 123)); // OK
    }
yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号。

    function* demo() {
      foo(yield 'a', yield 'b'); // OK
      let input = yield; // OK
    }
