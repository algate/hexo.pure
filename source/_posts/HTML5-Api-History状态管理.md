title: HTML5 - 新增Api-History
date: 2018-06-17 15:21:30
categories:
- HTML5
tags:
- History历史状态管理
---
前端路由的实现方式

前端路由主要由两种方式实现：

location.hash+hashchange事件
history.pushState()+popState事件

#### hash+hashchange实现

这种方法的好处在于支持IE浏览器。对早期的一些浏览器的支持比较好。
实现原理：
location.hash始终指向页面url 中#之后的内容
当当前页面的url =`www.baidu.com`,可以在浏览器的控制台输入location.hash为空，
当页面指向url =`www.baidu.com/#/hello`的时候,location.hash = `#/hello`。通过读取location.hash可以知道当前页面所处的位置。通过hashchange事件可以监听location.hash的变化，从而进行相应的处理即可。
那么如何触发hash的改变呢？这里主要由两种方法：

设置a标签，href ='#/blue'，当点击标签的时候，可以在当前url的后面增加上'#/blue'，同时触发hashchange,再回调函数中进行处理。
直接在js中对`location.hash ='#/blue'`即可，此时url会改变，也会触发hashchange事件。
下面给出一个通用的hash前端路由的实现方案：
<!-- more -->

    function Router() {
       this.currentUrl = '';
       this.routes = {};
    }
    Router.prototype.route = function(path, callback) {
       this.routes[path] = callback || function() {}
    }
    Router.prototype.refresh = function() {
       this.currentUrl = location.hash.slice(1) || '/';
       this.routes[this.currentUrl]();
    }
    Router.prototype.init = function() {
       window.addEventListener('load', this.refresh.bind(this), false);
       window.addEventListener('hashchange', this.refresh.bind(this), false);
       // console.log(location.hash)
       // if(location.hash.slice(1)!=='/')
       // location.hash = '#/';
    }
上述定义了一个Router对象，在实例中可以这么使用：

    var route = new Router();
    route.init();

    function changecolor(color) {
        var body = document.getElementsByTagName('body')[0];
        body.style['background-color'] = color;
    }
    route.route('/', changecolor.bind(null, 'skyblue'));
    route.route('/blue', changecolor.bind(null, 'blue'));
    route.route('/green', changecolor.bind(null, 'green'));
    route.route('/color', function() {
        var p = document.getElementsByTagName('a');
        [].forEach.call(p, function(item) {
            item.style['color'] = '#' + ((~~(Math.random() * (1 << 24))).toString(16));
        })
    });
>新建一个Router的实例，进行初始化，然后进行url与callback的绑定，就可以在hash发生改变的时候出发触发相应的callback。这种方式支持浏览器的前进与后退。很好的解决了前后端分离之后的问题。这种方式有一个缺点就是#的存在，让一些人看了觉得不是很舒服，所以html给history新增了一些api，从而以一种更优雅的方式实现前端路由。

#### history.pushState()+popstate
跟之前的方法一样,pushState()修改url的地址，popstate监听地址的改变，不同的是，手动的进行pushState()并不会触发popstate事件。
可以这样理解：

1.用户点击了某个链接，触发ajax获取新的页面或者触发js中的某些操作，改变了dom结构。
2.我们希望保存上一个页面，这时候我们就使用pushState(data,null,url)来将上一个页面的信息保存下来。
3.当用户点击浏览器的前进或者后退的时候，触发popstate事件，可以读取到数据，然后进行该页面的操作或者ajax获取该页面的数据，也可以通过pushState()中的data来进行还原、更新。

    (function() {
        var div1 = document.getElementById('div1');
        var a1 = document.getElementById('a1');
        var a2 = document.getElementById('a2');
        var count1 = 0;
        var count2 = 0;
        //最开始的状态，采用replace直接替换
        history.replaceState({
            count1: count1,
            count2: count2
        }, null, '');
        a1.addEventListener('click', function() {
            count1++;
            //之后的状态，需要进行保存
            history.pushState({
                count1: count1,
                count2: count2
            }, null, '#/s' + count1);
            a1.innerHTML = 's' + count1;
        })
        a2.addEventListener('click', function() {
            count2++;
            //之后的状态，需要进行保存
            history.pushState({
                count1: count1,
                count2: count2
            }, null, '#/k' + count2);
            a2.innerHTML = 'k' + count2;
        })
        window.addEventListener('popstate', function(e) {
            console.log(e.state);
            //监听popstate事件，对状态进行还原
            a1.innerHTML = 's' + e.state.count1;
            a2.innerHTML = 'k' + e.state.count2;
        })
    })()
>采用了立即执行函数来避免污染全局变量，其中点击一下a1,a2元素，均会进行pushState操作，在进行前进后退的时候，就会触发popstate事件，通过在该事件中对元素进行还原，优雅的解决了单页应用前进后退问题。
演示地址：[demo](http://blog.xiaoboma.com/router-history/)

完整代码：
```
    <!DOCTYPE html>
    <html>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
    <meta name="renderer" content="webkit" />
    <head>
    <title>pushState demo</title>
    <style>
        body {
            font-family: "Microsoft YaHei";
            transition: background-color .3s;
        }
        .bg-org {
            color: #383c3c;
            background-color: #FF6633;
        }
        .bg-blue {
            color: #fbfaf5;
            background-color: #6699FF;
        }
        .time {
            margin-top: 20%;
            text-align: center;
            font-size: 4em;
            font-weight: 100;
        }
        .switch {
            margin: auto;
            width: 30px;
            height: 30px;
            position:absolute;
            bottom:25%;
            left:0;
            right:0;
            cursor:pointer;
            box-shadow: 0 0 0 5px rgba(255,255,255,.6);
            border-radius: 50%;
            transition: box-shadow .1s;
        }
        .switch:hover {
            box-shadow: 0 0 0 5px rgba(255,255,255,.75);
        }
        .switch:active {
            box-shadow: 0 0 0 30px rgba(255,255,255,.4);
        }
    </style>
    </head>

    <body class="bg-org">
        <h1 id="time" class="time">Loading...</h1>
        <div id="switch" class="switch"></div>
    <!-- 传统location方式 -->
    <!-- <script>
        if(urlParam('state')=='blue') {
            $('body').className = 'bg-blue';
        } else {
            $('body').className = 'bg-org';
        }

        var time = $('#time');
        function $(selector) {return document.querySelector(selector);}
        // 显示当前时间
        setInterval(function(){
            var date = new Date(),
                format = function(n) {return n<10?'0'+n:n};
            time.innerHTML = format(date.getHours()) + ' : ' + format(date.getMinutes()) + ' : ' + format(date.getSeconds());
        }, 500);

        $('#switch').addEventListener('click', toggleState, false);
        function toggleState(e) {
            var flag = $('body').className=='bg-org'?'bg-blue':'bg-org';
            window.location = location.pathname + '?state=' + flag.split('-')[1];
            $('body').className = flag;
        }

        /**
         * 获取url参数
         * @param  {String} name 参数名
         * @return {String}      参数值
         */
        function getUrlParam(name){
            var reg, value;
            reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            value = window.location.search.substr(1).match(reg);
            return value==null?null:decodeURI(value[2]);
        }
    </script> -->
    <!-- popstate事件 -->
        <!-- <script>
            var time = $('#time');
            function $(selector) {return document.querySelector(selector);}

            // 显示当前时间
            setInterval(function(){
                var date = new Date(),
                    format = function(n) {return n<10?'0'+n:n};
                time.innerHTML = format(date.getHours()) + ' : ' + format(date.getMinutes()) + ' : ' + format(date.getSeconds());
            }, 500);

            $('#switch').addEventListener('click', toggleState, false);

            // 监听popstate事件
            history.pushState && window.addEventListener("popstate", function(e) {

                // 获取history.state对象中的状态信息
                // 在这里state将自动成为event的子对象，可直接通过event.state访问
                var flag = e.state && e.state.title;
                $('body').className = flag || ($('body').className=='bg-org'?'bg-blue':'bg-org');
            }, false);



            function toggleState(e) {
                var flag = $('body').className=='bg-org'?'bg-blue':'bg-org';

                // 新建历史记录，将当前状态信息保存至history.state中
                console.log(history);
                history.pushState && history.pushState({ title: flag }, flag, '?state='+flag.split('-')[1]);
                $('body').className = flag;
            }
        </script> -->

        <!-- hashchange事件 -->
    <script>
        var time = $('#time');
        function $(selector) {return document.querySelector(selector);}
        // 显示当前时间
        setInterval(function(){
            var date = new Date(),
                format = function(n) {return n<10?'0'+n:n};
            time.innerHTML = format(date.getHours()) + ' : ' + format(date.getMinutes()) + ' : ' + format(date.getSeconds());
        }, 500);

        // 监听onhashchange事件
        window.addEventListener("hashchange", function(e) {
            // 获取hash值判断页面状态
            var flag = location.hash && location.hash.substring(1);
            console.log(flag);
            $('body').className = 'bg-'+flag || ($('body').className=='bg-org'?'bg-blue':'bg-org');
        }, false);
        $('#switch').addEventListener('click', toggleState, false);
        function toggleState(e) {
            var flag = $('body').className=='bg-org'?'bg-blue':'bg-org';

            // 在url中写入新的hash值
            location.hash = flag.split('-')[1];
            $('body').className = flag;
        }
    </script>
    </body>
    </html>
```
