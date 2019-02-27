title: Progress标签样式
date: 2016-09-10 17:31:30
categories:
- Css
tags:
- progress
---
progress元素属于HTML5家族，指进度条。IE10+以及其他靠谱浏览器都支持。如下简单code:

    <progress>o(︶︿︶)o</progress>

不同浏览器下的效果不尽相同,样式控制有巨大差异，详细自己可以写个html的progress的标签看看不同浏览器下的效果，哎，那叫一个惨不忍睹！
<!-- more -->
* 使用progress{border:……; background:……;}可以控制浏览器下progress元素的边框和背景色。其中，Chrome浏览器是个特例，直接的设置看不到效果（实际上支持），原因下面会解释。
* FireFox浏览器
已经完成的进度条，使用progress::-moz-progress-bar { }表示，这与Chrome浏览器是相反的。
* Chrome的表现与FireFox有着明显的差异，其progress元素的结构似乎是这样的：

    progress
        progress-value
        progress-bar
<!-- more -->
其中，progress-bar指全部的进度，progress-value指已经完成的进度。因此，Chrome浏览器下，已经完成的进度条，使用progress::-webkit-progress-value { }表示， FireFox浏览器下是moz-bar. 而progress-bar默认含有背景色，因此，我们需要如下设置，以自定义背景色：progress::-webkit-progress-bar { background: ……; }

* Opera浏览器
Opera似乎没有什么::-o-progress-\*{}的用法，因此，Opera浏览器，其已完成进度的背景色是无解的，只能使用默认的颜色——我的浏览器是和谐绿色。

* IE10浏览器
IE10浏览器很奇葩的，它也可以设置已完成进度的背景色，使用的是color属性，progress{color:\*;}

综上全部，我们可以使用类似下面的CSS实现最大兼容的自定义进度条样式：

    progress {
        border: none;
        width: 100%;
        height: 30px;
        background: #e3e9ee;
        color: #19ca6c; /* IE10、Firefox */
    }
    progress::-moz-progress-bar { background: #19ca6c; }  /* firefox value */
    progress::-webkit-progress-bar { background: #e3e9ee; }
    progress::-webkit-progress-value  { background: #19ca6c; }

得到如下效果样式：
![](/hexo.pure/images/posts/progress/01.png)

>最后：IE6~IE9浏览器不支持progress元素，我们可以通过嵌套其他元素的方法进行兼容

    <progress max="100" value="20"><ie style="width:20%;"></ie></progress>

css:

    /*ie6-ie9*/
    progress ie {
        display:block;
        height: 100%;
        background: #19ca6c;
    }

progress以及自定义的ie元素，ie6~8都是不认识的，我们需要打个动态补丁

js:

    if (typeof window.screenX !== "number") {
        document.createElement("progress");
        document.createElement("ie");
    }

