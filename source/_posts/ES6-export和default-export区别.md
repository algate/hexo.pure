title: ES6-export与export default区别
date: 2017-05-15 17:31:30
categories:
- Es6
tags:
- es6
---

1.export与export default均可用于导出常量、函数、文件、模块等

2.你可以在其它文件或模块中通过import+(常量 | 函数 | 文件 | 模块)名的方式，将其导入，以便能够对其进行使用

3.在一个文件或模块中，export、import可以有多个，export default仅有一个

4.通过export方式导出，在导入时要加{ }，export default则不需要

<!-- more -->

1.export
```
//a.js
export const str = "blablabla~";
export function log(sth) {
  return sth;
}
```
对应的导入方式：
```
//b.js
import { str, log } from 'a'; //也可以分开写两次，导入的时候带花括号
```
2.export default
```
//a.js
const str = "blablabla~";
export default str;
```
对应的导入方式：
```
//b.js
import str from 'a'; //导入的时候没有花括号
```
使用export default命令，为模块指定默认输出，这样就不需要知道所要加载模块的变量名
```
//a.js
let sex = "boy";
export default sex（sex不能加大括号）
```
原本直接export sex外部是无法识别的，加上default就可以了.但是一个文件内最多只能有一个export default。
其实此处相当于为sex变量值"boy"起了一个系统默认的变量名default，自然default只能有一个值，所以一个文件内不能有多个export default。
```
import any from "./a.js"
import any12 from "./a.js"
console.log(any,any12)   // boy,boy
```
