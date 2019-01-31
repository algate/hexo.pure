title: HTML5 - 新增标签和删除的标签
date: 2018-05-25 15:17:30
categories:
- HTML5
tags:
- HTML5
---

*** 一、新增标签
**** 结构标签

相当于有意义的div标签
article：用于定义一篇文章
header：定义页面的头部
footer：
nav：导航条链接
section：定义一个区域
aside：定义页面内容的侧边栏
hgroup：定义文件中一个区块的相关信息
figure：定义一组媒体内容以及它们的标题（可以用于包裹canvas，video等多媒体标签）
figcaption：用于figure标签内定义媒体的标题
footer：定义一个页面区域的底部
dialog：定义一个对话框（例如微信的对话框）
补充一：header/section/footer/aside/article/footer这几个标签最好不要嵌套在里面，放在最外边
补充二：使用层级(header=section=footer：写在外层)>(aside/article/figure/hgroup/nav：写在内层)
<!-- more -->
**** 多媒体标签

***** 第一类

video：定义一个视频
video标签和audio标签使用差不多
1.autoplay：是否自动播放
2.controls：是否展示控制器
4.可以用css控制视频框的宽度和高度
3.可以包裹source标签

audio：定义一个音频
1.autoplay：是否自动播放（autoplay="autoplay"：自动播放，不写则默认不自动播放）
2.loop：是否重复以及重复几次（loop='-1'时无限重复，=数字时重复数字次数）
3.controls：是否显示控制器（controls="controls"时显示，不写则默认不显示）
4.可以包裹source标签

source：定义媒体资源
可以用于audio和video标签内部，并且可以添加不同格式的媒体文件，type属性用于填写转码格式，如下：

***** 第二类

canvas（图片标签）：定义图片

***** 第三类

embed：定义外部可交互内容和插件，例如flash
使用方法和audio和video标签类似
1.可以使用css控制资源显示的大小

**** Web应用标签
***** 第一类：状态标签
****** meter：实时状态显示：气压、气温等（目前只支持谷歌和opera）
        属性：
        1.value：定义目前所处状态（数值）
        2.min：最低数值
        3.max：最高数值
        4.low：最低显示（低于该值为为黄色）
        5.high：最高显示（高于该值为黄色）
        6.optimum：最优值

用法一
<meter value='220' min='20' max='380' low='200' high='240' optimum='220'></meter>

    <meter value='220' min='20' max='380' low='200' high='240' optimum='220'></meter>

<meter value='0.75'>75%</meter>

    <meter value='0.75'>75%</meter>


****** progress：显示任务过程：安装、加载等（目前只支持谷歌，火狐和opera）
    属性
    1.value：当前的状态值
    2.max：最大状态值

用法一：显示正在加载状态

**** 列表标签

***** datalist：为input标签定义一个下拉列表，配合option（兼容火狐和谷歌）
用法：input标签中的list属性的值和datalist标签中的id必须相同，才能进行下拉拓展

    <input type="text" placeholder="111" list='phonelist'> <datalist id="phonelist"> <option value="三星"></option> <option value="华为"></option> <option value="苹果"></option> <option value="小米"></option> <option value="大春"></option> </datalist>
***** details：定义一个元素的详细内容，配合summary标签，用于展示省略的信息（兼容谷歌和其他一些高版本浏览器）
用法：

另外可以配合summary标签修改标题的显示

<details>
    <summary>很多的a</summary>
</details>

***** Menu标签（很多浏览器都不支持，建议少用或不用）

menu：命令列表
    menuitem：menu命令列表标签（只有火狐8.0以上支持）
    command：menu标签定义的一个命令按钮（只有IE9支持，以上或以下都不支持）

***** 注释标签（不是平时的注释，这个标签主要用于类似注释拼音之类，会显示出来）
ruby和rt标签
用法：用ruby标签将字括起来，然后rt标签填写注释信息

    <p>注<ruby>释<rt>shi</rt></ruby>标签</p>
mark：用于标黄（所有主流浏览器都支持，IE要9以上）

    <p><mark>aaaaa</mark>aaaaa</p>

*** 三、使用HTML5新标签进行布局的意义

1.提升语义化特性和网页的质量
2.减少了用于css调用的class和id属性
3.对搜索引擎更友好
