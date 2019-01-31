title: JS-WebAssembly系列
date: 2018-04-01 14:02:30
categories:
- Javascript
tags:
- WebAssembly
---

>Google推出了Native Client，让开发者将一些C/C++代码打包集成到浏览器中，然而，只有Chrome支持这项技术，达不到广义上的可移植要求。
几年前，Mozilla发布了asm.js，打开了性能优化的大门。他们最早提出了使用JS中的严格子集。通过限制语言的功能性，他们能够预测虚拟机的下一步反应，从而通过移除某些不必要的检查操作以提高性能。但这种技术也会影响语言的动态行为。
所有的这些技术构成了今天WA诞生的基础。WebAssembly运行在JS虚拟机内部，使用了JS的部分功能，这意味着它不仅能够与运行最新Web浏览器的设备兼容，也能做到向前兼容。为了实现这一点，设计人员正在开发一个polyfill，核心思想是将每个函数转换为语义上等效的JS代码，虽然这样做会影响运行性能，但至少能解决代码的运行问题。

<!-- more -->
##### 什么是WebAssembly
WebAssembly 是为 Web 而设计的、可以生成浏览器可执行的二进制文件的编程语言。并且于2017 年 2 月 28 日，四个主要的浏览器一致同意宣布 WebAssembly 的 MVP 版本已经完成，即将推出一个浏览器可以搭载的稳定版本。WebAssembly 的一个主要目标就是变快。本文将给出一些它如何变快的技术细节。

当然，“快”是相对的概念。相比于JavaScript和其他动态语言，WebAssembly的快主要是因为它的静态类型特性和方便优化特性。WebAssembly 意在速度上能够达到和本地执行一样快，其实 asm.js 已经比较接近这一目标了，但是 WebAssembly 要进一步缩短和本地执行速度之间的差距。因此本文着重介绍为什么 WebAssembly 比 asm.js 更快。

在开始介绍之前，先做一些说明：新的技术总是有一些还没来得及优化的情况，所以目前来说，并不是所有情况下 WebAssembly 都是最快的。本文主要表达的是 WebAssembly 为什么应该是更快的。对于它还不是那么快的一些情况，也是未来需要 fix 的问题。

WebAssembly 比 JavaScript 执行更快是因为：

    文件抓取阶段，WebAssembly 比 JavaScript 抓取文件更快。即使 JavaScript 进行了压缩，WebAssembly 文件的体积也比 JavaScript 更小；
    解析阶段，WebAssembly 的解码时间比 JavaScript 的解析时间更短；
    编译和优化阶段，WebAssembly 更具优势，因为 WebAssembly 的代码更接近机器码，而 JavaScript 要先通过服务器端进行代码优化。
    重优化阶段，WebAssembly 不会发生重优化现象。而 JS 引擎的优化假设则可能会发生“抛弃优化代码<->重优化”现象。
    执行阶段，WebAssembly 更快是因为开发人员不需要懂太多的编译器技巧，而这在 JavaScript 中是需要的。WebAssembly 代码也更适合生成机器执行效率更高的指令。
    垃圾回收阶段，WebAssembly 垃圾回收都是手动控制的，效率比自动回收更高。

这就是为什么在大多数情况下，同一个任务 WebAssembly 比 JavaScript 表现更好的原因。

但是，还有一些情况 WebAssembly 表现的会不如预期；同时 WebAssembly 的未来也会朝着使 WebAssembly 执行效率更高的方向发展。


#### WebAssembly 的现在与未来
2017 年 2 月 28 日，四个主要的浏览器一致同意宣布 WebAssembly 的MVP 版本已经完成，它是一个浏览器可以搭载的稳定版本。

它提供了浏览器可以搭载的稳定核，这个核并没有包含 WebAssembly 组织所计划的所有特征，而是提供了可以使 WebAssembly 稳定运行的基本版本。

这样一来开发者就可以使用 WebAssembly 代码了。对于旧版本的浏览器，开发者可以通过 asm.js 来向下兼容代码，asm.js 是 JavaScript 的一个子集，所有 JS 引擎都可以使用它。另外，通过 Emscripten 工具，你可以把你的应用编译成 WebAssembly 或者 asm.js。

尽管是第一个版本，WebAssembly 已经能发挥出它的优势了，未来通过不断地改善和融入新特征，WebAssembly 会变的更快。
提升浏览器中 WebAssembly 的性能

随着各种浏览器都使自己的引擎支持 WebAssembly，速度提升就变成自然而然的了，目前各大浏览器厂商都在积极推动这件事情。
JavaScript 和 WebAssembly 之间调用的中间函数

目前，在 JS 中调用 WebAssembly 的速度比本应达到的速度要慢。这是因为中间需要做一次“蹦床运动”。JIT 没有办法直接处理 WebAssembly，所以 JIT 要先把 WebAssembly 函数发送到懂它的地方。这一过程是引擎中比较慢的地方。

按理来讲，如果 JIT 知道如何直接处理 WebAssembly 函数，那么速度会有百倍的提升。

如果你传递的是单一任务给 WebAssembly 模块，那么不用担心这个开销，因为只有一次转换，也会比较快。但是如果是频繁地从 WebAssembly 和 JavaScript 之间切换，那么这个开销就必须要考虑了。
快速加载

JIT 必须要在快速加载和快速执行之间做权衡。如果在编译和优化阶段花了大量的时间，那么执行的必然会很快，但是启动会比较慢。目前有大量的工作正在研究，如何使预编译时间和程序真正执行时间两者平衡。

WebAssembly 不需要对变量类型做优化假设，所以引擎也不关心在运行时的变量类型。这就给效率的提升提供了更多的可能性，比如可以使编译和执行这两个过程并行。

加之最新增加的 JavaScript API 允许 WebAssembly 的流编译，这就使得在字节流还在下载的时候就启动编译。

FireFox 目前正在开发两个编译器系统。一个编译器先启动，对代码进行部分优化。在代码已经开始运行时，第二个编译器会在后台对代码进行全优化，当全优化过程完毕，就会将代码替换成全优化版本继续执行。
添加后续特性到 WebAssembly 标准的过程

WebAssembly 的发展是采用小步迭代的方式，边测试边开发，而不是预先设计好一切。

这就意味着有很多功能还在襁褓之中，没有经过彻底思考以及实际验证。它们想要写进标准，还要通过所有的浏览器厂商的积极参与。

这些特性叫做：未来特性。这里列出几个。

直接操作 DOM

目前 WebAssembly 没有任何方法可以与 DOM 直接交互。就是说你还不能通过比如element.innerHTML 的方法来更新节点。

想要操作 DOM，必须要通过 JS。那么你就要在 WebAssembly 中调用 JavaScript 函数（WebAssembly 模块中，既可以引入 WebAssembly 函数，也可以引入 JavaScript 函数）。

不管怎么样，都要通过 JS 来实现，这比直接访问 DOM 要慢得多，所以这是未来一定要解决的一个问题。

共享内存的并发性

提升代码执行速度的一个方法是使代码并行运行，不过有时也会适得其反，因为不同的线程在同步的时候可能会花费更多的时间。

这时如果能够使不同的线程共享内存，那就能降低这种开销。实现这一功能 WebAssembly 将会使用 JavaScript 中的 SharedArrayBuffer，而这一功能的实现将会提高程序执行的效率。

SIMD（单指令，多数据）

如果你之前了解过 WebAssembly 相关的内容，你可能会听说过 SIMD，全称是：Single Instruction, Multiple Data（单指令，多数据），这是并行化的另一种方法。

SIMD 在处理存放大量数据的数据结构有其独特的优势。比如存放了很多不同数据的 vector（容器），就可以用同一个指令同时对容器的不同部分做处理。这种方法会大幅提高复杂计算的效率，比如游戏或者 VR。

这对于普通 web 应用开发者不是很重要，但是对于多媒体、游戏开发者非常关键。

异常处理

许多语言都仿照 C++ 式的异常处理，但是 WebAssembly 并没有包含异常处理。

如果你用 Emscripten 编译代码，就知道它会模拟异常处理，但是这一过程非常之慢，慢到你都想用“DISABLEEXCEPTIONCATCHING” 标记把异常处理关掉。

如果异常处理加入到了 WebAssembly，那就不用采用模拟的方式了。而异常处理对于开发者来讲又特别重要，所以这也是未来的一大功能点。

其他改进——使开发者开发起来更简单

一些未来特性不是针对性能的，而是使开发者开发 WebAssembly 更方便。

    一流的开发者工具。目前在浏览器中调试 WebAssembly 就像调试汇编一样，很少的开发者可以手动地把自己的源代码和汇编代码对应起来。我们在致力于开发出更加适合开发者调试源代码的工具。
    垃圾回收。如果你能提前确定变量类型，那就可以把你的代码变成 WebAssembly，例如 TypeScript 代码就可以编译成 WebAssembly。但是现在的问题是 WebAssembly 没办法处理垃圾回收的问题，WebAssembly 中的内存操作都是手动的。所以 WebAssembly 会考虑提供方便的 GC 功能，以方便开发者使用。
    ES6 模块集成。目前浏览器在逐渐支持用 script 标记来加载 JavaScript 模块。一旦这一功能被完美执行，那么像 <script src=url type="module"> 这样的标记就可以运行了，这里的 url可以换成 WebAssembly 模块。

本文摘自知乎：[WebAssembly系列（六）WebAssembly的现在与未来](https://zhuanlan.zhihu.com/p/25799683)
