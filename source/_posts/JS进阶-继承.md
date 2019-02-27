title: 继承
date: 2018-06-09 15:46:30
categories:
- Javascript
tags:
- 继承
---

引用网上的一张图
![](/hexo.pure/images/posts/js/inherit/01.png)

>简单概括就四句话
1.实例的__proto__ === 构造函数的prototype
2.构造函数的__proto__ === Function.prototye
3.构造函数原型(Array.prototype)的__proto__ === Object.prototype(对象的原型)
4.Object.prototype.__proto__ === null;

#### js中有三种继承方式
##### 1.js原型（prototype）实现继承
```
<html>
<body>
<script type="text/javascript">
    function Person(name,age){
        this.name=name;
        this.age=age;
    }
    Person.prototype.sayHello=function(){
        alert("使用原型得到Name："+this.name);
    }
    var per=new Person("马小倩",21);
    per.sayHello(); //输出：使用原型得到Name:马小倩

    function Student(){}
    Student.prototype=new Person("洪如彤",21);
    var stu=new Student();
    Student.prototype.grade=5;
    Student.prototype.intr=function(){
        alert(this.grade);
    }
    stu.sayHello();//输出：使用原型得到Name:洪如彤
    stu.intr();//输出：5
</script>
</body>
</html>
```
<!-- more -->
##### 2.构造函数实现继承
```
<html>
<body>
<script type="text/javascript">
    function  Parent(name){
        this.name=name;
        this.sayParent=function(){
            alert("Parent:"+this.name);
        }
    }

    function  Child(name,age){
        this.tempMethod=Parent;
        this.tempMethod(name);
        this.age=age;
        this.sayChild=function(){
            alert("Child:"+this.name+"age:"+this.age);
        }
    }

    var parent=new Parent("江剑臣");
    parent.sayParent(); //输出：“Parent:江剑臣”
    var child=new Child("李鸣",24); //输出：“Child:李鸣 age:24”
    child.sayChild();
</script>
</body>
</html>
```
##### 3.call , apply实现继承
```
<html>
<body>
<script type="text/javascript">
    function  Person(name,age,love){
        this.name=name;
        this.age=age;
        this.love=love;
        this.say=function say(){
            alert("姓名："+name);
        }
    }

    //call方式
    function student(name,age){
        Person.call(this,name,age);
    }

    //apply方式
    function teacher(name,love){
        Person.apply(this,[name,love]);
        //Person.apply(this,arguments); //跟上句一样的效果，arguments
    }

    //call与aplly的异同：
    //1,第一个参数this都一样,指当前对象
    //2,第二个参数不一样：call的是一个个的参数列表；apply的是一个数组（arguments也可以）

    var per=new Person("武凤楼",25,"魏荧屏"); //输出：“武凤楼”
    per.say();
    var stu=new student("曹玉",18);//输出：“曹玉”
    stu.say();
    var tea=new teacher("秦杰",16);//输出：“秦杰”
    tea.say();

</script>
</body>
</html>
```
有如下代码：
```
var A = function(x) {
    this.x = x;
}
A.prototype.say = function() {
    console.log(this.x);
}
a = new A(3);
a.say();
console.log(a);
```
<!-- more -->
如果改成es6的写法：

    class A {
        constructor(x){
            this.x = x;
        }
        say(){
            console.log(this.x);
        }
    }
我们要定义一个B，让B继承A的方法；

```
// B继承A
var B = function(x) {
    A.call(this, x)  // 继承x
}
B.prototype = new A(); // 继承A的原型
var b = new B(5);
b.say();
console.log(b);
```
如果写成es6语法的继承：
// C继承A

    class C extends A{};
    var c = new C(6);
    c.say();
    console.log(c);

把数字转换成数组

    class NumPrototype {
        constructor(x) {
            this.x = x;
        }
        get iterate() {
            return this.iterateF();
        }
        iterateF () {
            var result = [];
            for (var i = 0; i <= this.x; i++) {
                result.push(i);
            }
            return result;
        }
    };
    var no = new NumPrototype(8);
    var arr = no.iterate;
    console.log(arr, no.iterate);
