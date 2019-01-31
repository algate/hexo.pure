title: Js - 判断对象还是数组
date: 2018-06-07 14:36:30
categories:
- Javascript
tags:
- 判断对象
---
1.对于Javascript 1.8.5（ECMAScript 5），变量名字.isArray( )可以实现这个目的

     var a=[];
     var b={};
     Array.isArray(a);//true
     Array.isArray(b)//false

<!-- more -->
2.如果你只是用typeof来检查该变量，不论是array还是object，都将返回‘objec'。 此问题的一个可行的答案是是检查该变量是不是object，

并且检查该变量是否有数字长度（当为空array时长度也可能为0,object的长度为undefined）。

    var a=[];
    var b={};
    typeof a === 'object' && !isNaN(a.length)//true
    typeof b === 'object' && !isNaN(b.length)//false


3.调用toString( )方法试着将该变量转化为代表其类型的string。

    var a=[];
    var b={};
    Object.prototype.toString.call(a)  === '[object Array]'//true
    Object.prototype.toString.call(b)  === '[object Array]'//false
