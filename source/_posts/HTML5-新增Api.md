title: HTML5 - 新增Api
date: 2018-06-15 18:05:30
categories:
- HTML5
tags:
- HTML5相关Api
---

### 1. H5新增选择器( SelectorsAPI )

##### querySelector("body / #mydiv / .selected / img .fig / [title=hello]")

参数：一个CSS选择符  “img .layer”返回类为”fig”的第一个img元素;
返回：匹配到的第一个元素
调用：Document类型，Element类型
浏览器的兼容性：IE8+、FireFox3.5+、Safari3.1+、Chrome和Opera10+

##### querySelectorAll()
<!-- more -->

参数：也是一个CSS选择符
返回：一个NodeList实例
调用：Document类型，Element类型和DocumentFragment类型
浏览器的兼容性：IE8+、FireFox3.5+、Safari3.1+、Chrome和Opera10+

##### document.getElementByClass("className")

参数：一个或多个类名的字符串
返回：一个NodeList实例
调用：Document类型
浏览器的兼容性：IE9+

##### Element.classList  属性

返回: 该元素的class属性值的列表，返回的列表是一个类似数组的对象,存在length属性
返回的对象存在操作class值的方法：

    add(value): 将给定的字符串value,添加class 属性列表, 若已存在，就不添加
    remove(value): 从列表中删除value
    toggle(value): 切换class，即：存在时删除，不存在时添加
    contains(value): 判断列表中是否存在value
浏览器的兼容性：Firefox3.6+ 和 Chrome


### 2. 焦点管理 - H5添加了辅助管理DOM焦点的功能。

##### 1）document.activeElement属性，该属性引用DOM中当前获得了焦点的元素

元素获得焦点的方式：

页面加载（文档刚刚加载完成时，document.activeElement保存的是document.body元素的引用，文档加载期间为null）
用户输入
在代码中调用focus()方法, 如 button.focus()。

##### 2）document.hasFocus() 方法，用于确定文档是否获得了焦点，获得了焦点时为true,否则为false

通过检测文档是否获得了焦点，可以知道用户是不是正在与页面交互，提高Web应用的无障碍性。
浏览器兼容性：IE4+ 、Firefox 3+ 、 Safari 4+ 、Chrome和 Opera 8+

### 3. 自定义数据属性

HTML5规定，可以为元素添加非标准的属性，但要添加前缀data-,目的是为元素提供与渲染无关的信息，或者提供语义信息。这些属性可以任意添加、随便命名，只要以data开头即可。

    <div id="mydiv" data-app="12" data-myname="Lily" data-my-sex="女"></div>
访问和设置自定义属性：

    //通过元素的dataset属性，该属性返回值是DOMStringMap, 即一个名值对的映射
    alert ( div.dataset.app ) ;   //输出”12”         div.dataset.app=”34”;
    alert ( div.dataset.myname ) ;   //输出”Lily”    div.dataset.myname=”Jack”;
    alert ( div.dataset.mySex );   //输出”女”        div.dataset.mySex=”men”;  //驼峰式
自定义数据属性的作用：实现HTML标签与JS的交互相分离，根据不同属性值，实现不同的效果。如：库jquery mobile, AngularJS

### 4. 延迟加载JS

外部 JS作为body元素的最后一个标签加入HTML，不影响文档页面加载的速度
如果给`<script>`标签添加`defer`属性，则该标签引入的JS外部文件加载会延迟到onload事件触发之前完成。
如果给`<script>`标签添加`async`属性, JS文件会异步加载，多个JS文件都添加该属性时，执行顺序不一定，那个先加载完执行哪个，这是就会出现函数找不到的问题。
一般用于JS文件之间是并行关系时使用，如加载广告

### 5. 历史状态管理 - onhashchange & pushState || replaceState
1) 通过用户跳转页面的操作，改变历史状态管理：

在现代Web应用中，用户的每次操作不一定打开一个全新的页面，因此”后退”和”前进”按钮也就失去了作用，导致用户很难在不同的状态间切换。

2）在网页URL后面添加hash值参数，改变历史状态管理：

如baidu.com#aaaaaaa
通过window.location.hash访问和设置URL的参数列表

    alert (window.location.hash) //输出当前页面的参数列表 “#aaaaaaa”

H5新增了hashchange 事件，以便在URL的参数列表（及URL中" # "号后面的所有字符串）发生变化时，通知开发人员。
新增这个事件，是因为在Ajax应用中，开发人员经常要利用URL参数列表来保存状态或导航信息。
必须把`onhashchange` 事件绑定到window对象上。
浏览器兼容性：IE8+ ,Firefox3.6+, Safari5+, Chrome和Opera10.6+

    <html>
    <head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <title>无标题文档</title>
    <script>
    window.onload = function() {
        var oInput = document.getElementById('input1');
        var oDiv = document.getElementById('div1');
        var json = {};
        oInput.onclick = function() {
            var num = Math.random(); //产生0-1之间的随机数
            var arr = randomNum(35, 7); //产生7个由1-35之间的整数组成的随机数
            json[num] = arr;
            console.log(json);
            // oDiv.innerHTML = arr;
            window.location.hash = num; //设置当前网页网址URL的hash值
        };
        window.onhashchange = function() {
            console.log(window.location.hash);
            oDiv.innerHTML = json[window.location.hash.substring(1)];
        };

        function randomNum(iAll, iNow) {
            var arr = [];
            var newArr = [];
            for (var i = 1; i <= iAll; i++) {
                arr.push(i);
            }

            for (var i = 0; i < iNow; i++) {
                newArr.push(arr.splice(Math.floor(Math.random() * arr.length), 1));
            }
            return newArr;
        }
    };
    </script>
    </head>

    <body>
    <input type="button" type="button" value="随机选择" id="input1">
    <div id="div1"></div>
    </body>
    </html>

3) 通过history对象的`pushState()`方法可以创建新的历史状态,通过window的`popstate事件对象`的`state属性`可以获得作为第一个参数传递给pushState()方法的状态对象。

replaceState()方法：重写当前状态，参数与 pushState()方法的前两个参数相同。

详细操作更新：
现在HTML5规范为window.history引入了两个新api，pushState和replaceState，我们可以使用它很方便的达到改变url不重载页面的目的。
未完待续…
[https://blog.csdn.net/helloxiaoliang/article/details/73850428](https://blog.csdn.net/helloxiaoliang/article/details/73850428)

浏览器兼容性：Firefox4+,Safari5+, Opera11.5+和Chrome支持。

### 6.HTMLDocument的变化
##### readyState
IE4首先为document设置了readyState属性，其他浏览器也陆续增加了这个属性，HTML最终将这个属性写入了标准。在IE中，document的readyState属性包括两个值：
[1]loading：正在载入文档
[2]complete：文档加载结束
我们看下标准中对readyState的阐述：
>在firefox、chrome等浏览器中，loading和complete之间还有一个interactive状态，我们看一下MDN中对interactive状态的阐述：
>The document has finished loading and the document has been parsed but sub-resources such as images, stylesheets and frames are still loading. The state indicates that theDOMContentLoaded event has been fired.
也就是说，文档本身已经被加载完毕，并且也已经被解析完毕，但是像image,css style文件等外部资源还在下载，这时意味着DOMContentLoaded事件的触发。

在readyState状态的改变会触发readystatechange事件，我们可以通过为document绑定readystatechange事件来监听其状态的变化。

注：IE4+,Firefox3.6+,chrome,Opera9+,Safari支持这两个属性

