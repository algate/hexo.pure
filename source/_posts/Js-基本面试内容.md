title: JS - 基础面试内容
date: 2018-04-14 10:46:30
categories:
- Javascript
tags:
- 基础知识
---

##### 1.Doctype作用？标准模式与兼容模式各有什么区别?

（1）、`<!DOCTYPE>`声明位于HTML文档中的第一行，处于 `<html>`标签之前。告知浏览器的解析器用什么文档标准解析这个文档。DOCTYPE不存在或格式不正确会导致文档以兼容模式呈现。

（2）、标准模式的排版 和JS运作模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示,模拟老式浏览器的行为以防止站点无法工作。

##### 2.行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

（1）行内元素有：a b span img input select strong（强调的语气）
（2）块级元素有：div ul ol li dl dt dd h1 h2 h3 h4…p
（3）常见的空元素：`<br> <hr> <img> <input> <link> <meta>`
鲜为人知的是：
    `<area> <base> <col> <command> <embed> <keygen> <param> <source> <track> <wbr>`
<!-- more -->
##### 3.页面导入样式时，使用link和@import有什么区别？

（1）link属于XHTML标签，除了加载CSS外，还能用于定义RSS, 定义rel连接属性等作用；而@import是CSS提供的，只能用于加载CSS;

（2）页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载;

（3）import是CSS2.1 提出的，只在IE5以上才能被识别，而link是XHTML标签，无兼容问题;

(4)link支持使用js控制DOM去改变样式，而@import不支持;

##### 4.介绍一下你对浏览器内核的理解？

主要分成两部分：渲染引擎(layout engineer或Rendering Engine)和JS引擎。
渲染引擎：负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入CSS等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其它需要编辑、显示网络内容的应用程序都需要内核。

JS引擎则：解析和执行javascript来实现网页的动态效果。

最开始渲染引擎和JS引擎并没有区分的很明确，后来JS引擎越来越独立，内核就倾向于只指渲染引擎。

##### 5.常见的浏览器内核有哪些？

Trident内核：IE,MaxThon,TT,The World,360,搜狗浏览器等。[又称MSHTML]
Gecko内核：Netscape6及以上版本，FF,MozillaSuite/SeaMonkey等
Presto内核：Opera7及以上。      [Opera内核原为：Presto，现为：Blink;]
Webkit内核：Safari,Chrome等。   [ Chrome的：Blink（WebKit的分支）]

##### 6.html5有哪些新特性、移除了那些元素？如何处理HTML5新标签的浏览器兼容问题？如何区分 HTML 和 HTML5？
 HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等功能的增加。
  绘画 canvas;
  用于媒介回放的 video 和 audio 元素;
  本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失;
  sessionStorage 的数据在浏览器关闭后自动删除;
  语意化更好的内容元素，比如 article、footer、header、nav、section;
  表单控件，calendar、date、time、email、url、search、tel、number;
  新的技术webworker, websocket, Geolocation;
移除的元素：
  纯表现的元素：basefont，big，center，font, s，strike，tt，u;
  对可用性产生负面影响的元素：frame，frameset，noframes；

 支持HTML5新标签：
 IE8/IE7/IE6支持通过document.createElement方法产生的标签，
 可以利用这一特性让这些浏览器支持HTML5新标签，
 浏览器支持新标签后，还需要添加标签默认的样式。

当然也可以直接使用成熟的框架、比如html5shim;

    <!--[if lt IE 9]>
        <script> src="http://html5shim.googlecode.com/svn/trunk/html5.js"</script>
    <![endif]-->

 如何区分HTML5： DOCTYPE声明\新增的结构元素\功能元素


##### 7.简述一下你对HTML语义化的理解？

用正确的标签做正确的事情。
html语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析;
即使在没有样式CSS情况下也以一种文档格式显示，并且是容易阅读的;
搜索引擎的爬虫也依赖于HTML标记来确定上下文和各个关键字的权重，利于SEO;
使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。

##### 8.HTML5的离线储存怎么使用，工作原理能不能解释一下？
[https://yanhaijing.com/html/2014/12/28/html5-manifest/](https://yanhaijing.com/html/2014/12/28/html5-manifest/)

在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。
原理：HTML5的离线存储是基于一个新建的.appcache文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像cookie一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。

如何使用：
1、页面头部像下面一样加入一个manifest的属性；
2、在`cache.manifest`文件的编写离线存储的资源；
3、在离线状态时，操作`window.applicationCache`进行需求实现。

浏览器是怎么对HTML5的离线储存资源进行管理和加载的呢？

在线的情况下，浏览器发现html头部有manifest属性，它会请求manifest文件，如果是第一次访问app，那么浏览器就会根据manifest文件的内容下载相应的资源并且进行离线存储。如果已经访问过app并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的manifest文件与旧的manifest文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。
离线的情况下，浏览器就直接使用离线存储的资源。

##### 9.请描述一下 cookies，sessionStorage 和 localStorage 的区别？

cookie是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）。
cookie数据始终在同源的http请求中携带（即使不需要），记会在浏览器和服务器间来回传递。
sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。

存储大小：
cookie数据大小不能超过4k。
sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。

有期时间：
localStorage    存储持久数据，浏览器关闭后数据不丢失除非主动删除数据；
sessionStorage  数据在当前浏览器窗口关闭后自动删除。
cookie          设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭



##### 10.iframe有那些缺点？

iframe会阻塞主页面的Onload事件；
搜索引擎的检索程序无法解读这种页面，不利于SEO;

iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。

使用iframe之前需要考虑这两个缺点。如果需要使用iframe，最好是通过javascript
动态给iframe添加src属性值，这样可以绕开以上两个问题。

##### 11.Label的作用是什么？是怎么用的？

label标签来定义表单控制间的关系,当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。

    <label for="Name">Number:</label>
    <input type=“text“name="Name" id="Name"/>
    <label>Date:<input type="text" name="B"/></label>

##### 12.如何实现浏览器内多个标签页之间的通信? (阿里)

WebSocket、SharedWorker；
也可以调用localstorge、cookies等本地存储方式；

localstorge另一个浏览上下文里被添加、修改或删除时，它都会触发一个事件，
我们通过监听事件，控制它的值来进行页面信息通信；
注意quirks：Safari 在无痕模式下设置localstorge值时会抛出 QuotaExceededError 的异常；

##### 13.webSocket如何兼容低浏览器？(阿里)

Adobe Flash Socket 、
ActiveX HTMLFile (IE) 、
基于 multipart 编码发送 XHR 、
基于长轮询的 XHR


##### 14.网页验证码是干嘛的，是为了解决什么安全问题。

区分用户是计算机还是人的公共全自动程序。可以防止恶意破解密码、刷票、论坛灌水；
有效防止黑客对某一个特定注册用户用特定程序暴力破解方式进行不断的登陆尝试。

##### 15.介绍一下标准的CSS的盒子模型？低版本IE的盒子模型有什么不同的？

（1）有两种， IE 盒子模型、W3C 盒子模型；
（2）盒模型： 内容(content)、填充(padding)、边界(margin)、 边框(border)；
（3）区  别： IE的content部分把 border 和 padding计算了进去;

##### 16.CSS选择符有哪些？哪些属性可以继承？

1.id选择器（ # myid）
2.类选择器（.myclassname）
3.标签选择器（div, h1, p）
4.相邻选择器（h1 + p）
5.子选择器（ul > li）
6.后代选择器（li a）
7.通配符选择器（ * ）
8.属性选择器（a[rel = "external"]）
9.伪类选择器（a:hover, li:nth-child）

可继承的样式： font-size font-family color, UL LI DL DD DT;

不可继承的样式：border padding margin width height ;

##### 17.CSS优先级算法如何计算？

   优先级就近原则，同权重情况下样式定义最近者为准;
   载入样式以最后载入的定位为准;

优先级为:

同权重: 内联样式表（标签内部）> 嵌入样式表（当前文件中）> 外部样式表（外部文件中）。
    !important >  id > class > tag
    important 比 内联优先级高
##### 18.CSS3新增伪类有那些？
举例：

    p:first-of-type 选择属于其父元素的首个 <p> 元素的每个 <p> 元素。
    p:last-of-type  选择属于其父元素的最后 <p> 元素的每个 <p> 元素。
    p:only-of-type    选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。
    p:only-child        选择属于其父元素的唯一子元素的每个 <p> 元素。
    p:nth-child(2)  选择属于其父元素的第二个子元素的每个 <p> 元素。
    ::after         在元素之前添加内容,也可以用来做清除浮动。
    ::before            在元素之后添加内容
    :enabled
    :disabled       控制表单控件的禁用状态。
    :checked        单选框或复选框被选中。

##### 19.display有哪些值？说明他们的作用。
    block           块类型。默认宽度为父元素宽度，可设置宽高，换行显示。
    none            缺省值。象行内元素类型一样显示。
    inline          行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。
    inline-block    默认宽度为内容宽度，可以设置宽高，同行显示。
    list-item       象块类型元素一样显示，并添加样式列表标记。
    table           此元素会作为块级表格来显示。
    inherit         规定应该从父元素继承 display 属性的值。

##### 20.position的值relative和absolute定位原点是？
absolute
生成绝对定位的元素，相对于值不为 static的第一个父元素进行定位。
fixed （老IE不支持）
生成绝对定位的元素，相对于浏览器窗口进行定位。
relative
生成相对定位的元素，相对于其正常位置进行定位。
static
默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right z-index 声明）。
inherit
规定从父元素继承 position 属性的值。

##### 21.CSS3有哪些新特性？

新增各种CSS选择器  （: not(.input)：所有 class 不是“input”的节点）
圆角          （border-radius:8px）
多列布局        （multi-column layout）
阴影和反射   （Shadow\Reflect）
文字特效        （text-shadow、）
文字渲染        （Text-decoration）
线性渐变        （gradient）
旋转          （transform）
缩放,定位,倾斜,动画,多背景
例如:transform:\scale(0.85,0.90)\ translate(0px,-30px)\ skew(-9deg,0deg)\Animation:

##### 22.请解释一下CSS3的Flexbox（弹性盒布局模型）,以及适用场景？

一个用于页面布局的全新CSS3功能，Flexbox可以把列表放在同一个方向（从上到下排列，从左到右），并让列表能延伸到占用可用的空间。
较为复杂的布局还可以通过嵌套一个伸缩容器（flex container）来实现。
采用Flex布局的元素，称为Flex容器（flex container），简称"容器"。
它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称"项目"。
常规布局是基于块和内联流方向，而Flex布局是基于flex-flow流可以很方便的用来做局中，能对不同屏幕大小自适应。
在布局上有了比以前更加灵活的空间。

[http://www.w3cplus.com/css3/flexbox-basics.html](http://www.w3cplus.com/css3/flexbox-basics.html)

##### 23.一个满屏 品 字布局 如何设计?

简单的方式：
上面的div宽100%，
下面的两个div分别宽50%，
然后用float或者inline使其不换行即可

##### 24.经常遇到的浏览器的兼容性有哪些？原因，解决方法是什么，常用hack的技巧 ？

png24位的图片在iE6浏览器上出现背景，解决方案是做成PNG8.

浏览器默认的margin和padding不同。解决方案是加一个全局的 nodeName{margin:0;padding:0;}来统一。

IE6双边距bug:块属性标签float后，又有横行的margin情况下，在ie6显示margin比设置的大。

浮动ie产生的双倍距离 `#box{ float:left; width:10px; margin:0 0 0 100px;}`

这种情况之下IE会产生20px的距离，解决方案是在float的标签样式控制中加入 ——\_display:inline;将其转化为行内属性。(\_这个符号只有ie6会识别)

渐进识别的方式，从总体中逐渐排除局部。

首先，巧妙的使用“\9”这一标记，将IE游览器从所有情况中分离出来。
接着，再次使用“+”将IE8和IE7、IE6分离开来，这样IE8已经独立识别。
css:

    .bb{
        background-color:red;/*所有识别*/
        background-color:#00deff\9; /*IE6、7、8识别*/
        +background-color:#a200ff;/*IE6、7识别*/
        \_background-color:#1e0bd1;/*IE6识别*/
    }


  IE下,可以使用获取常规属性的方法来获取自定义属性,
 也可以使用`getAttribute()`获取自定义属性;
 Firefox下,只能使用`getAttribute()`获取自定义属性。
 解决方法:统一通过`getAttribute()`获取自定义属性。

  IE下,even对象有x,y属性,但是没有pageX,pageY属性;
 Firefox下,event对象有pageX,pageY属性,但是没有x,y属性。

  解决方法：（条件注释）缺点是在IE浏览器下可能会增加额外的HTTP请求数。

  Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,
 可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决。

##### 25.超链接访问过后hover样式就不出现了 被点击访问过的超链接样式不在具有hover和active了解决方法是改变CSS属性的排列顺序:

    L-V-H-A :  a:link {} a:visited {} a:hover {} a:active {}

##### 26.li与li之间有看不见的空白间隔是什么原因引起的？有什么解决办法？

行框的排列会受到中间空白（回车\空格）等的影响，因为空格也属于字符,这些空白也会被应用样式，占据空间，所以会有间隔，把字符大小设为0，就没有空格了。

##### 27.为什么要初始化CSS样式。

- 因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。

- 当然，初始化样式会对SEO有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化。

最简单的初始化方法：  `*{padding: 0; margin: 0;}` （强烈不建议）

淘宝的样式初始化代码：

    body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; }
    body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; }
    h1, h2, h3, h4, h5, h6{ font-size:100%; }
    address, cite, dfn, em, var { font-style:normal; }
    code, kbd, pre, samp { font-family:couriernew, courier, monospace; }
    small{ font-size:12px; }
    ul, ol { list-style:none; }
    a { text-decoration:none; }
    a:hover { text-decoration:underline; }
    sup { vertical-align:text-top; }
    sub{ vertical-align:text-bottom; }
    legend { color:#000; }
    fieldset, img { border:0; }
    button, input, select, textarea { font-size:100%; }
    table { border-collapse:collapse; border-spacing:0; }

##### 28.CSS里的visibility属性有个collapse属性值是干嘛用的？在不同浏览器下以后什么区别？

对于普通元素visibility:collapse;会将元素完全隐藏,不占据页面布局空间,与display:none;表现相同. 如果目标元素为table,visibility:collapse;将table隐藏,但是会占据页面布局空间. 仅在Firefox下起作用,IE会显示元素,Chrome会将元素隐藏,但是占据空间.

##### 29.对BFC规范(块级格式化上下文：block formatting context)的理解？

（W3C CSS 2.1 规范中的一个概念,它是一个独立容器，决定了元素如何对其内容进行定位,以及与其他元素的关系和相互作用。）
一个页面是由很多个 Box 组成的,元素的类型和 display 属性,决定了这个 Box 的类型。
不同类型的 Box,会参与不同的 Formatting Context（决定如何渲染文档的容器）,因此Box内的元素会以不同的方式渲染,也就是说BFC内部的元素和外部

##### 30.css定义的权重

以下是权重的规则：标签的权重为1，class的权重为10，id的权重为100，以下例子是演示各种定义的权重值：

```
    /*权重为1*/
    div{
    }
    /*权重为10*/
    .class1{
    }
    /*权重为100*/
    #id1{
    }
    /*权重为100+1=101*/
    #id1 div{
    }
    /*权重为10+1=11*/
    .class1 div{
    }
    /*权重为10+10+1=21*/
    .class1 .class2 div{
    }
```
如果权重相同，则最后定义的样式会起作用，但是应该避免这种情况出现

##### 31.请解释一下为什么需要清除浮动？清除浮动的方式

清除浮动是为了清除使用浮动元素产生的影响。浮动的元素，高度会塌陷，而高度的塌陷使我们页面后面的布局不能正常显示。

1、父级div定义height；
2、父级div 也一起浮动；
3、常规的使用一个class；

    .clearfix::before, .clearfix::after {
        content: " ";
        display: table;
    }
    .clearfix::after {
        clear: both;
    }
    .clearfix {
        \*zoom: 1;
    }

4、SASS编译的时候，浮动元素的父级div定义伪类:after

    &::after,&::before{
        content: " ";
          visibility: hidden;
          display: block;
          height: 0;
          clear: both;
    }

解析原理：

1) display:block 使生成的元素以块级元素显示,占满剩余空间;
2) height:0 避免生成内容破坏原有布局的高度。
3) visibility:hidden 使生成的内容不可见，并允许可能被生成内容盖住的内容可以进行点击和交互;
4）通过 content:"."生成内容作为最后一个元素，至于content里面是点还是其他都是可以的，例如oocss里面就有经典的 content:".",有些版本可能content 里面内容为空,一丝冰凉是不推荐这样做的,firefox直到7.0 content:”" 仍然会产生额外的空隙；
5）zoom：1 触发IE hasLayout。

>通过分析发现，除了clear：both用来闭合浮动的，其他代码无非都是为了隐藏掉content生成的内容，这也就是其他版本的闭合浮动为什么会有font-size0，line-height：0。


##### 32.zoom:1的清除浮动原理?

清除浮动，触发hasLayout；
Zoom属性是IE浏览器的专有属性，它可以设置或检索对象的缩放比例。解决ie下比较奇葩的bug。
譬如外边距（margin）的重叠，浮动清除，触发ie的haslayout属性等。

来龙去脉大概如下：
当设置了zoom的值之后，所设置的元素就会就会扩大或者缩小，高度宽度就会重新计算了，这里一旦改变zoom值时其实也会发生重新渲染，运用这个原理，也就解决了ie下子元素浮动时候父元素不随着自动扩大的问题。

Zoom属是IE浏览器的专有属性，火狐和老版本的webkit核心的浏览器都不支持这个属性。然而，zoom现在已经被逐步标准化，出现在 CSS 3.0 规范草案中。

目前非ie由于不支持这个属性，它们又是通过什么属性来实现元素的缩放呢？
可以通过css3里面的动画属性scale进行缩放。

##### 33.移动端的布局用过媒体查询吗？

假设你现在正用一台显示设备来阅读这篇文章，同时你也想把它投影到屏幕上，或者打印出来， 而显示设备、屏幕投影和打印等这些媒介都有自己的特点，CSS就是为文档提供在不同媒介上展示的适配方法

当媒体查询为真时，相关的样式表或样式规则会按照正常的级联规被应用。 当媒体查询返回假， 标签上带有媒体查询的样式表 仍将被下载 （只不过不会被应用）。

包含了一个媒体类型和至少一个使用 宽度、高度和颜色等媒体属性来限制样式表范围的表达式。 CSS3加入的媒体查询使得无需修改内容便可以使样式应用于某些特定的设备范围。

    <style> @media (min-width: 700px) and (orientation: landscape){ .sidebar { display: none; } } </style>

##### 34.CSS优化、提高性能的方法有哪些？

关键选择器（key selector）。选择器的最后面的部分为关键选择器（即用来匹配目标元素的部分）；
如果规则拥有 ID 选择器作为其关键选择器，则不要为规则增加标签。过滤掉无关的规则（这样样式系统就不会浪费时间去匹配它们了）；
提取项目的通用公有样式，增强可复用性，按模块编写组件；增强项目的协同开发性、可维护性和可扩展性;
使用预处理工具或构建工具（gulp对css进行语法检查、自动补前缀、打包压缩、自动优雅降级）；

##### 35.如何修改chrome记住密码后自动填充表单的黄色背景 ？

    input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
        background-color: rgb(250, 255, 189); /* #FAFFBD; */
        background-image: none;
        color: rgb(0, 0, 0);
    }

##### 36.如果需要手动写动画，你认为最小时间间隔是多久，为什么？（阿里）

多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60＊1000ms ＝ 16.7ms

##### 37.么是CSS 预处理器 / 后处理器？

- 预处理器例如：LESS、Sass、Stylus，用来预编译Sass或less，增强了css代码的复用性，
还有层级、mixin、变量、循环、函数等，具有很方便的UI组件模块化开发能力，极大的提高工作效率。

- 后处理器例如：PostCSS，通常被视为在完成的样式表中根据CSS规范处理CSS，让其更有效；目前最常做的
是给CSS属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。

##### 38.介绍js的基本数据类型。

    Undefined、Null、Boolean、Number、String、
    ECMAScript 2015 新增:Symbol(创建后独一无二且不可变的数据类型 )

##### 39.介绍js有哪些内置对象？

Object 是 JavaScript 中所有对象的父对象

<!-- 数据封装类对象：Object、Array、Boolean、Number 和 String -->
<!-- 其他对象：Function、Arguments、Math、Date、RegExp、Error -->

参考：http://www.ibm.com/developerworks/cn/web/wa-objectsinjs-v1b/index.html


##### 40.说几条写JavaScript的基本规范？

1.不要在同一行声明多个变量。
2.请使用 ===/!==来比较true/false或者数值
3.使用对象字面量替代new Array这种形式
4.不要使用全局函数。
5.Switch语句必须带有default分支
6.函数不应该有时候有返回值，有时候没有返回值。
7.For循环必须使用大括号
8.If语句必须使用大括号
9.for-in循环中的变量 应该使用var关键字明确限定作用域，从而避免作用域污染。

##### 41.JavaScript原型，原型链 ? 有什么特点？

每个对象都会在其内部初始化一个属性，就是prototype(原型)，当我们访问一个对象的属性时，
如果这个对象内部不存在这个属性，那么他就会去prototype里找这个属性，这个prototype又会有自己的prototype，
于是就这样一直找下去，也就是我们平时所说的原型链的概念。
关系：instance.constructor.prototype = instance.__proto__

特点：
JavaScript对象是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。当我们修改原型时，与之相关的对象也会继承这一改变。


当我们需要一个属性的时，Javascript引擎会先看当前对象中是否有这个属性， 如果没有的话，
    就会查找他的Prototype对象是否有这个属性，如此递推下去，一直检索到 Object 内建对象。

    function Func(){}
    Func.prototype.name = "Sean";
    Func.prototype.getInfo = function() {
      return this.name;
    }
    var person = new Func();//现在可以参考var person = Object.create(oldObject);
    console.log(person.getInfo());//它拥有了Func的属性和方法
    //"Sean"
    console.log(Func.prototype);
    // Func { name="Sean", getInfo=function()}

##### 42.写一个通用的事件侦听器函数。

event(事件)工具集，来源：github.com/markyun

    markyun.Event = {
        // 页面加载完成后
        readyEvent : function(fn) {
            if (fn==null) {
                fn=document;
            }
            var oldonload = window.onload;
            if (typeof window.onload != 'function') {
                window.onload = fn;
            } else {
                window.onload = function() {
                    oldonload();
                    fn();
                };
            }
        },
        // 视能力分别使用dom0||dom2||IE方式 来绑定事件
        // 参数： 操作的元素,事件名称 ,事件处理程序
        addEvent : function(element, type, handler) {
            if (element.addEventListener) {
                //事件类型、需要执行的函数、是否捕捉
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + type, function() {
                    handler.call(element);
                });
            } else {
                element['on' + type] = handler;
            }
        },
        // 移除事件
        removeEvent : function(element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.datachEvent) {
                element.detachEvent('on' + type, handler);
            } else {
                element['on' + type] = null;
            }
        },
        // 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
        stopPropagation : function(ev) {
            if (ev.stopPropagation) {
                ev.stopPropagation();
            } else {
                ev.cancelBubble = true;
            }
        },
        // 取消事件的默认行为
        preventDefault : function(event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },
        // 获取事件目标
        getTarget : function(event) {
            return event.target || event.srcElement;
        },
        // 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
        getEvent : function(e) {
            var ev = e || window.event;
            if (!ev) {
                var c = this.getEvent.caller;
                while (c) {
                    ev = c.arguments[0];
                    if (ev && Event == ev.constructor) {
                        break;
                    }
                    c = c.caller;
                }
            }
            return ev;
        }
    };

##### 43.事件是？IE与火狐的事件机制有什么区别？ 如何阻止冒泡？

1. 我们在网页中的某个操作（有的操作对应多个事件）。例如：当我们点击一个按钮就会产生一个事件。是可以被 JavaScript 侦测到的行为。
2. 事件处理机制：IE是事件冒泡、Firefox同时支持两种事件模型，也就是：捕获型事件和冒泡型事件；
3. `ev.stopPropagation()`;（旧ie的方法 ev.cancelBubble = true;）

##### 44.什么是闭包（closure），为什么要用它？

闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量,利用闭包可以突破作用链域，将函数内部的变量和方法传递到外部。

闭包的特性：

1.函数内再嵌套函数
2.内部函数可以引用外层的参数和变量
3.参数和变量不会被垃圾回收机制回收

li节点的onclick事件都能正确的弹出当前被点击的li索引

    <ul id="testUL">
         <li> index = 0</li>
         <li> index = 1</li>
         <li> index = 2</li>
         <li> index = 3</li>
     </ul>
     <script type="text/javascript">
        var nodes = document.getElementsByTagName("li");
        for(i = 0;i<nodes.length;i+= 1){
            nodes[i].onclick = (function(i){
                return function() {
                    console.log(i);
                } //不用闭包的话，值每次都是4
            })(i);
        }
     </script>



执行`say667()`后,`say667()`闭包内部变量会存在,而闭包内部函数的内部变量不会存在
使得Javascript的垃圾回收机制GC不会收回`say667()`所占用的资源
因为`say667()`的内部函数的执行需要依赖`say667()`中的变量
这是对闭包作用的非常直白的描述

    function say667() {
    // Local variable that ends up within closure
    var num = 666;
    var sayAlert = function() {
        alert(num);
    }
    num++;
    return sayAlert;
    }

    var sayAlert = say667();
    sayAlert()//执行结果应该弹出的667

##### 45.javascript 代码中的"use strict";是什么意思 ? 使用它区别是什么？

`use strict`是一种ECMAscript 5 添加的（严格）运行模式,这种模式使得 Javascript 在更严格的条件下运行,

使JS编码更加规范化的模式,消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为。
默认支持的糟糕特性都会被禁用，比如不能用with，也不能在意外的情况下给全局变量赋值;
全局变量的显示声明,函数必须声明在顶层，不允许在非函数代码块内声明函数,arguments.callee也不允许使用；
消除代码运行的一些不安全之处，保证代码运行的安全,限制函数中的arguments修改，严格模式下的eval函数的行为和非严格模式的也不相同;

提高编译器效率，增加运行速度；
为未来新版本的Javascript标准化做铺垫。

##### 46.new操作符具体干了什么呢?

 1、创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。
 2、属性和方法被加入到 this 引用的对象中。
 3、新创建的对象由 this 所引用，并且最后隐式的返回 this 。

    var obj  = {};
    obj.__proto__ = Base.prototype;
    Base.call(obj);

##### 47.`[].forEach.call($$("*"),function(a){a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)})` 能解释一下这段代码的意思吗？

$$('a') 你可以在自己的浏览器上面运行一下，就是页面上所有的a标签

~~    看在浏览器上面的运行(所以~~的作用就相当于parseInt)
    var a=12.233
    ~~as
    12
    var b=-123.455
    ~~b
    -123

1<<24    也就是1向左移24位    也就是2的24次方

##### 48.js延迟加载的方式有哪些？

defer和async、动态创建DOM方式（用得最多）、按需异步载入js

##### 49.Ajax 是什么? 如何创建一个Ajax？

ajax的全称：Asynchronous Javascript And XML。
异步传输+js+xml。
所谓异步，在这里简单地解释就是：向服务器发送请求的时候，我们不必等待结果，而是可以同时做其他的事情，等到有了结果它自己会根据设定进行后续操作，与此同时，页面是不会发生整页刷新的，提高了用户体验。

(1)创建XMLHttpRequest对象,也就是创建一个异步调用对象
(2)创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息
(3)设置响应HTTP请求状态变化的函数
(4)发送HTTP请求
(5)获取异步调用返回的数据
(6)使用JavaScript和DOM实现局部刷新

##### 50.Ajax 解决浏览器缓存问题？

1、在ajax发送请求前加上 anyAjaxObj.setRequestHeader("If-Modified-Since","0")。

2、在ajax发送请求前加上 anyAjaxObj.setRequestHeader("Cache-Control","no-cache")。

3、在URL后面加上一个随机数： "fresh=" + Math.random();。

4、在URL后面加上时间戳："nowtime=" + new Date().getTime();。

5、如果是使用jQuery，直接这样就可以了 `$.ajaxSetup({cache:false})`。这样页面的所有ajax都会执行这条语句就是不需要保存缓存记录。

##### 51.如何解决跨域问题?

jsonp、 iframe、window.name、window.postMessage、服务器上设置代理页面

##### 52.AMD（Modules/Asynchronous-Definition）、CMD（Common Module Definition）规范区别？
Asynchronous Module Definition，异步模块定义，所有的模块将被异步加载，模块加载不影响后面语句运行。所有依赖某些模块的语句均放置在回调函数中。

区别：

 1. 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible.
 2. CMD 推崇依赖就近，AMD 推崇依赖前置。看代码：

// CMD

    define(function(require, exports, module) {
        var a = require('./a')
        a.doSomething()
        // 此处略去 100 行
        var b = require('./b') // 依赖可以就近书写
        b.doSomething()
        // ...
    })

// AMD 默认推荐

    define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好
        a.doSomething()
        // 此处略去 100 行
        b.doSomething()
        // ...
    })

##### 53.DOM操作——怎样添加、移除、移动、复制、创建和查找节点?

（1）创建新节点
    createDocumentFragment()    //创建一个DOM片段
    createElement()   //创建一个具体的元素
    createTextNode()   //创建一个文本节点
（2）添加、移除、替换、插入
    appendChild()
    removeChild()
    replaceChild()
    insertBefore() //在已有的子节点前插入一个新的子节点
（3）查找
    getElementsByTagName()    //通过标签名称
    getElementsByName()    //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)
    getElementById()    //通过元素Id，唯一性

##### 54.js函数节流和函数防抖
函数节流应用的实际场景，多数在监听页面元素滚动事件的时候会用到。因为滚动事件，是一个高频触发的事件。
函数防抖的应用场景，最常见的就是用户注册时候的手机号码验证和邮箱验证了。只有等用户输入完毕后，前端才需要检查格式是否正确，如果不正确，再弹出提示语。
概念解释

函数节流: 频繁触发,但只在特定的时间内才执行一次代码

函数防抖: 频繁触发,但只在特定的时间内没有触发执行条件才执行一次代码

// 普通滚动

    document.getElementById("nothing").onscroll = function(){
        console.log("普通滚动");
    };

// 函数节流

    var canRun = true;
    document.getElementById("throttle").onscroll = function(){
        if(!canRun){
            // 判断是否已空闲，如果在执行中，则直接return
            return;
        }

        canRun = false;
        setTimeout(function(){
            console.log("函数节流");
            canRun = true;
        }, 300);
    };

// 函数防抖

    var timer = false;
    document.getElementById("debounce").onscroll = function(){
        clearTimeout(timer); // 清除未执行的代码，重置回初始化状态

        timer = setTimeout(function(){
            console.log("函数防抖");
        }, 300);
    };


##### 55.描述一下React 生命周期

渲染过程调用到的生命周期函数，主要几个要知道；

    constructor 
    getInitialState 
    getDefaultProps 
    componentWillMount 
    render 
    componentDidMount 

更新过程

    componentWillReceiveProps 
    shouldComponentUpdate 
    componentWillUpdate 
    render 
    componentDidUpdate 

卸载过程

    componentWillUnmount



##### 56.实现组件有哪些方式？

React.createClass 使用API来定义组件
React ES6 class component 用 ES6 的class 来定义组件
Functional stateless component 通过函数定义无状态组件

##### 57.页面重构怎么操作？

网站重构：在不改变外部行为的前提下，简化结构、添加可读性，而在网站前端保持一致的行为。
也就是说是在不改变UI的情况下，对网站进行优化，在扩展的同时保持一致的UI。

对于传统的网站来说重构通常是：

表格(table)布局改为DIV+CSS
使网站前端兼容于现代浏览器(针对于不合规范的CSS、如对IE6有效的)
对于移动平台的优化
针对于SEO进行优化
深层次的网站重构应该考虑的方面

减少代码间的耦合
让代码保持弹性
严格按规范编写代码
设计可扩展的API
代替旧有的框架、语言(如VB)
增强用户体验
通常来说对于速度的优化也包含在重构中

压缩JS、CSS、image等前端资源(通常是由服务器来解决)
程序的性能优化(如数据读写)
采用CDN来加速资源加载
对于JS DOM的优化
HTTP服务器的文件缓存

##### 58.什么叫优雅降级和渐进增强？

优雅降级：Web站点在所有新式浏览器中都能正常工作，如果用户使用的是老式浏览器，则代码会针对旧版本的IE进行降级处理了,使之在旧式浏览器上以某种形式降级体验却不至于完全不能用。
如：border-shadow

渐进增强：从被所有浏览器支持的基本功能开始，逐步地添加那些只有新版本浏览器才支持的功能,向页面增加不影响基础浏览器的额外样式和功能的。当浏览器支持时，它们会自动地呈现出来并发挥作用。
如：默认使用flash上传，但如果浏览器支持 HTML5 的文件上传功能，则使用HTML5实现更好的体验；

##### 59.你有用过哪些前端性能优化的方法？

（1） 减少http请求次数：CSS Sprites, JS、CSS源码压缩、图片大小控制合适；网页Gzip，CDN托管，data缓存 ，图片服务器。

（2） 前端模板 JS+数据，减少由于HTML标签导致的带宽浪费，前端用变量保存AJAX请求结果，每次操作本地变量，不用请求，减少请求次数

（3） 用innerHTML代替DOM操作，减少DOM操作次数，优化javascript性能。

（4） 当需要设置的样式很多时设置className而不是直接操作style。

（5） 少用全局变量、缓存DOM节点查找的结果。减少IO读取操作。

（6） 避免使用CSS Expression（css表达式)又称Dynamic properties(动态属性)。

（7） 图片预加载，将样式表放在顶部，将脚本放在底部  加上时间戳。

（8） 避免在页面的主体布局中使用table，table要等其中的内容完全下载之后才会显示出来，显示比div+css布局慢。
对普通的网站有一个统一的思路，就是尽量向前端优化、减少数据库操作、减少磁盘IO。向前端优化指的是，在不影响功能和体验的情况下，能在浏览器执行的不要在服务端执行，能在缓存服务器上直接返回的不要到应用服务器，程序能直接取得的结果不要到外部取得，本机内能取得的数据不要到远程取，内存能取到的不要到磁盘取，缓存中有的不要去数据库查询。减少数据库操作指减少更新次数、缓存结果减少查询次数、将数据库执行的操作尽可能的让你的程序完成（例如join查询），减少磁盘IO指尽量不使用文件系统作为缓存、减少读写文件次数等。程序优化永远要优化慢的部分，换语言是无法“优化”的。

##### 60.http状态码有那些？分别代表是什么意思？

简单版

[
    100  Continue   继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息
    200  OK         正常返回信息
    201  Created    请求成功并且服务器创建了新的资源
    202  Accepted   服务器已接受请求，但尚未处理
    301  Moved Permanently  请求的网页已永久移动到新位置。
    302 Found       临时性重定向。
    303 See Other   临时性重定向，且总是使用 GET 请求新的 URI。
    304  Not Modified 自从上次请求后，请求的网页未修改过。
    400 Bad Request  服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
    401 Unauthorized 请求未授权。
    403 Forbidden   禁止访问。
    404 Not Found   找不到如何与 URI 相匹配的资源。
    500 Internal Server Error  最常见的服务器端错误。
    503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。
]

完整版

    1**(信息类)：表示接收到请求并且继续处理
100——客户必须继续发出请求
101——客户要求服务器根据请求转换HTTP协议版本

    2**(响应成功)：表示动作被成功接收、理解和接受
200——表明该请求被成功地完成，所请求的资源发送回客户端
201——提示知道新文件的URL
202——接受和处理、但处理未完成
203——返回信息不确定或不完整
204——请求收到，但返回信息为空
205——服务器完成了请求，用户代理必须复位当前已经浏览过的文件
206——服务器已经完成了部分用户的GET请求

    3**(重定向类)：为了完成指定的动作，必须接受进一步处理
300——请求的资源可在多处得到
301——本网页被永久性转移到另一个URL
302——请求的网页被转移到一个新的地址，但客户访问仍继续通过原始URL地址，重定向，新的URL会在response中的Location中返回，浏览器将会使用新的URL发出新的Request。
303——建议客户访问其他URL或访问方式
304——自从上次请求后，请求的网页未修改过，服务器返回此响应时，不会返回网页内容，代表上次的文档已经被缓存了，还可以继续使用
305——请求的资源必须从服务器指定的地址得到
306——前一版本HTTP中使用的代码，现行版本中不再使用
307——申明请求的资源临时性删除

    4**(客户端错误类)：请求包含错误语法或不能正确执行
400——客户端请求有语法错误，不能被服务器所理解
401——请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用
HTTP 401.1 - 未授权：登录失败
　　HTTP 401.2 - 未授权：服务器配置问题导致登录失败
　　HTTP 401.3 - ACL 禁止访问资源
　　HTTP 401.4 - 未授权：授权被筛选器拒绝
HTTP 401.5 - 未授权：ISAPI 或 CGI 授权失败
402——保留有效ChargeTo头响应
403——禁止访问，服务器收到请求，但是拒绝提供服务
HTTP 403.1 禁止访问：禁止可执行访问
　　HTTP 403.2 - 禁止访问：禁止读访问
　　HTTP 403.3 - 禁止访问：禁止写访问
　　HTTP 403.4 - 禁止访问：要求 SSL
　　HTTP 403.5 - 禁止访问：要求 SSL 128
　　HTTP 403.6 - 禁止访问：IP 地址被拒绝
　　HTTP 403.7 - 禁止访问：要求客户证书
　　HTTP 403.8 - 禁止访问：禁止站点访问
　　HTTP 403.9 - 禁止访问：连接的用户过多
　　HTTP 403.10 - 禁止访问：配置无效
　　HTTP 403.11 - 禁止访问：密码更改
　　HTTP 403.12 - 禁止访问：映射器拒绝访问
　　HTTP 403.13 - 禁止访问：客户证书已被吊销
　　HTTP 403.15 - 禁止访问：客户访问许可过多
　　HTTP 403.16 - 禁止访问：客户证书不可信或者无效
HTTP 403.17 - 禁止访问：客户证书已经到期或者尚未生效
404——一个404错误表明可连接服务器，但服务器无法取得所请求的网页，请求资源不存在。eg：输入了错误的URL
405——用户在Request-Line字段定义的方法不允许
406——根据用户发送的Accept拖，请求资源不可访问
407——类似401，用户必须首先在代理服务器上得到授权
408——客户端没有在用户指定的饿时间内完成请求
409——对当前资源状态，请求不能完成
410——服务器上不再有此资源且无进一步的参考地址
411——服务器拒绝用户定义的Content-Length属性请求
412——一个或多个请求头字段在当前请求中错误
413——请求的资源大于服务器允许的大小
414——请求的资源URL长于服务器允许的长度
415——请求资源不支持请求项目格式
416——请求中包含Range请求头字段，在当前请求资源范围内没有range指示值，请求也不包含If-Range请求头字段
417——服务器不满足请求Expect头字段指定的期望值，如果是代理服务器，可能是下一级服务器不能满足请求长。

    5**(服务端错误类)：服务器不能正确执行一个正确的请求
HTTP 500 - 服务器遇到错误，无法完成请求
　　HTTP 500.100 - 内部服务器错误 - ASP 错误
　　HTTP 500-11 服务器关闭
　　HTTP 500-12 应用程序重新启动
　　HTTP 500-13 - 服务器太忙
　　HTTP 500-14 - 应用程序无效
　　HTTP 500-15 - 不允许请求 global.asa
　　Error 501 - 未实现
HTTP 502 - 网关错误
HTTP 503：由于超载或停机维护，服务器目前无法使用，一段时间后可能恢复正常

##### 61.一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？（流程说的越详细越好）

注：这题胜在区分度高，知识点覆盖广，再不懂的人，也能答出几句，
而高手可以根据自己擅长的领域自由发挥，从URL规范、HTTP协议、DNS、CDN、数据库查询、
到浏览器流式解析、CSS规则构建、layout、paint、onload/domready、JS执行、JS API绑定等等；

详细版：
1、浏览器会开启一个线程来处理这个请求，对 URL 分析判断如果是 http 协议就按照 Web 方式来处理;
2、调用浏览器内核中的对应方法，比如 WebView 中的 loadUrl 方法;
3、通过DNS解析获取网址的IP地址，设置 UA 等信息发出第二个GET请求;
4、进行HTTP协议会话，客户端发送报头(请求报头);
5、进入到web服务器上的 Web Server，如 Apache、Tomcat、Node.JS 等服务器;
6、进入部署好的后端应用，如 PHP、Java、JavaScript、Python 等，找到对应的请求处理;
7、处理结束回馈报头，此处如果浏览器访问过，缓存上有对应资源，会与服务器最后修改时间对比，一致则返回304;
8、浏览器开始下载html文档(响应报头，状态码200)，同时使用缓存;
9、文档树建立，根据标记请求所需指定MIME类型的文件（比如css、js）,同时设置了cookie;
10、页面开始渲染DOM，JS根据DOM API操作DOM,执行事件绑定等，页面显示完成。

简洁版：
浏览器根据请求的URL交给DNS域名解析，找到真实IP，向服务器发起请求；
服务器交给后台处理完成后返回数据，浏览器接收文件（HTML、JS、CSS、图象等）；
浏览器对加载到的资源（HTML、JS、CSS等）进行语法解析，建立相应的内部数据结构（如HTML的DOM）；
载入解析到的资源文件，渲染页面，完成。

##### 62.前端工程师

参与项目，快速高质量完成实现效果图，精确到1px；

与团队成员，UI设计，产品经理的沟通；

做好的页面结构，页面重构和用户体验；

处理hack，兼容、写出优美的代码格式；

针对服务器的优化、拥抱最新前端技术。

##### 63.平时如何管理你的项目？

先期团队必须确定好全局样式（global.css），编码模式(utf-8) 等；

编写习惯必须一致（例如都是采用继承式的写法，单样式都写成一行）；

标注样式编写人，各模块都及时标注（标注关键样式调用的地方）；

页面进行标注（例如 页面 模块 开始和结束）；

CSS跟HTML 分文件夹并行存放，命名都得统一（例如style.css）；

JS 分文件夹存放 命名以该JS功能为准的英文翻译。

图片采用整合的 images.png png8 格式文件使用 尽量整合在一起使用方便将来的管理

##### 64.兼容性问题
1.如果图片加a标签在IE9-中会有边框
2.rgba不支持IE8
3.display:inline-block ie6/7不支持

    display:inline-block;
    *display:inline;
4.height不能小于16px,设置较小高度标签（一般小于10px），在IE6，IE7，遨游中高度超出自己设置高度
解决方案:

    overflow设置为hidden
5.png图片  IE6里面的png图片不能透明 兼容版本和无声明版本都是
解决方案:

        <!--[if IE ]>
        　　　<style type="text/css">
        　　　　　#DIVname{
        　　　　　　　　background:none;
        　　　　　　　　filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=scale, src="pngtouming.png"
        　　　　　}

        　　　</style>
        <![endif]-->
6.CSS3前缀

    -webkit-  webkit渲染引擎  chrome/safari
    -moz-   gecko渲染引擎   firefox
    -ms-    trident渲染引擎  IE
    -o-  　opeck渲染引擎　opera　
7.渐变

    filter: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#35FEA1,endColorStr=#6E9DFF); /*IE 6 7 8*/
    background: -ms-linear-gradient(top, #35FEA1,  #6E9DFF);/* IE 10 */
    background:-moz-linear-gradient(top, #35FEA1,  #6E9DFF); /*火狐*/
    background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#35FEA1), to(#6E9DFF));/*谷歌*/
    background: -webkit-gradient(linear, 0% 0%, 0% 100%,from(#35FEA1), to(#6E9DFF));/* Safari 4-5, Chrome 1-9*/
    background: -webkit-linear-gradient(top, #35FEA1,  #6E9DFF);/*Safari5.1 Chrome 10+*/
    background: -o-linear-gradient(top, #35FEA1,  #6E9DFF);/*Opera 11.10+*/
8.PIE.htc 可以实现很多css3属性在IE下的兼容性 如:圆角、阴影、渐变

　　(1) 圆角 border-radius

    .signBtn{
        height: 40px;
        background-color:#08BCD2;
        color: #fff;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        behavior: url(css/PIE.htc);
    }

　　(2)阴影 box-shadow

    .box{
    　　width:200px;
    　　height:200px;
    　　-webkit-box-shadow:1px 0 10px;
    　　-moz-box-shadow:1px 0 10px;
    　　box-shadow: 1px 0 10px;
    　　background-color: #fff;
    　　behavior: url(css/PIE.htc);/*IE边框阴影*/
    }

　　(3)背景透明rgba

    .box{
    　　 background-color:rgba(12, 154, 171, 0.29);
        behavior: url(css/PIE.htc);
        -pie-background:rgba(12, 154, 171, 0.29);
    }

　　(4)渐变

    .box{
       width:200px;
       height:400px;
       background:-webkit-gradient(linear, 0 0, 0 bottom, from(#9F9), to(#393));
       background:-moz-linear-gradient(#9F9, #393);
       -pie-background:linear-gradient(#9F9, #393);
       behavior:url(pie.htc);
    }


注:PIE.htc文件路径相对是相对于css文件,并非html文件,以上例子是将PIE.htc文件放在与css样式文件同一个文件夹css内,而对应的html问价与css文件夹同级

##### 65.标准浏览器和IE浏览器Dom操作

DOM标准的浏览器事件是通过addEventListener方法注册的，而IE内核的浏览器则是通过attachEvent方法注册的。

IE内核的浏览器事件模型是冒泡型事件，也就是说，在IE内核下，时间句柄的出发顺序是从ChildNode到ParentNode。

DOM标准的浏览器中多了一个事件捕获过程，也就是说，当开发者在一个元素上注册了事件后，这个事件的相应顺序是从window（顶层）开始一级一级向下传播，然后到了该元素后事件捕获过程结束，事件开始冒泡，一级一级向父元素冒泡。

阻止浏览器默认行为

    当我们要阻止浏览器中某个DOM元素的默认行为时，在W3C标准里调用e.preventDefault()，而在IE下则是通过设置window.event.returnValue=false来实现
阻止冒泡事件

    在W3C标准里调用e.stopPropagation()，而在IE下通过设置window.event.cancelBubble=true来实现

2.event对象有x、y两属性，FireFox中没有;相对的在FireFox中，event对象有pageX、pageY两属性
3.在IE中event对象有srcElement属性,但是没有target属性; 在Firefox中event对象有target属性,但是没有srcElement属性
event.target|| event.srcElement
4.var boy = someone.firstElementChild || someone.firstChild;
##### 66. typeof 和 instanceof

判断一个变量的类型尝尝会用 typeof 运算符
instanceof 运算符用于识别正在处理的对象的类型（判断一个实例是否属于构造函数类型）

    var oStringObject = new String("hello world");
    console.log(oStringObject instanceof String);
2. instanceof 常规用法

    // 判断 foo 是否是 Foo 类的实例
    function Foo(){}
    var foo = new Foo();
    console.log(foo instanceof Foo)//true
3. instanceof 在继承中关系中的用法

    // 判断 foo 是否是 Foo 类的实例 , 并且是否是其父类型的实例
    function Aoo(){}
    function Foo(){}
    Foo.prototype = new Aoo();//JavaScript 原型继承

    var foo = new Foo();
    console.log(foo instanceof Foo)//true
    console.log(foo instanceof Aoo)//true
4.instanceof 复杂用法

    console.log(Object instanceof Object);//true
    console.log(Function instanceof Function);//true
    console.log(Number instanceof Number);//false
    console.log(String instanceof String);//false

    console.log(Function instanceof Object);//true

    console.log(Foo instanceof Function);//true
    console.log(Foo instanceof Foo);//false
