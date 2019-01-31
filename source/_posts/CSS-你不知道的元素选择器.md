title: css - 元素选择器
date: 2018-05-11 14:07:30
categories:
- Css
tags:
- 选择器
---

#### 1.属性选择器：

如果您希望把包含标题（title）的所有元素变为红色，可以写作：

    *[title] {color:red;}
与上面类似，可以只对有 href 属性的锚（a 元素）应用样式：

    a[href] {color:red;}
还可以根据多个属性进行选择，只需将属性选择器链接在一起即可。
例如，为了将同时有 href 和 title 属性的 HTML 超链接的文本设置为红色，可以这样写：

    a[href][title] {color:red;}
<!-- more -->
可以对所有带有 alt 属性的图像应用样式，从而突出显示这些有效的图像：

    img[alt] {border: 5px solid red;}
>提示：上面这个特例更适合用来诊断而不是设计，即用来确定图像是否确实有效。

例如，假设希望将指向 Web 服务器上某个指定文档的超链接变成红色，可以这样写：

    a[href="http://www.w3school.com.cn/about_us.asp"] {color: red;}

与简单属性选择器类似，可以把多个属性-值选择器链接在一起来选择一个文档。

    a[href="http://www.w3school.com.cn/"][title="W3School"] {color: red;}

|||| - 属性与属性值必须完全匹配:
>如果属性值包含用空格分隔的值列表，匹配就可能出问题。

请考虑一下的标记片段：

    <p class="important warning">This paragraph is a very important warning.</p>
如果写成 `p[class="important"]`，那么这个规则不能匹配示例标记。
要根据具体属性值来选择该元素，必须这样写：

    p[class="important warning"] {color: red;}

|||| - 根据部分属性值选择

如果需要根据属性值中的词列表的某个词进行选择，则需要使用波浪号（~）。

假设您想选择 class 属性中包含 important 的元素，可以用下面这个选择器做到这一点：

    p[class~="important"] {color: red;}

>如果忽略了波浪号，则说明需要完成完全值匹配。

|||| - 子串匹配属性选择器

下面为您介绍一个更高级的选择器模块。

下表是对这些选择器的简单总结：
[attribute]     用于选取带有指定属性的元素。
[attribute=value]   用于选取带有指定属性和值的元素。
[attribute~=value]  用于选取属性值中包含指定词汇的元素。
[attribute|=value]  用于选取带有以指定值开头的属性值的元素，该值必须是整个单词。(value和value-)
[attribute^=value]  匹配属性值以指定值开头的每个元素。
[attribute$=value]  匹配属性值以指定值结尾的每个元素。
[attribute\*=value]  匹配属性值中包含指定值的每个元素。

|||| - 特定属性选择类型

    *[lang|="en"] {color: red;}

上面这个规则会选择 lang 属性等于 `en` 或以 `en-` 开头的所有元素。因此，以下示例标记中的前三个元素将被选中，而不会选择后两个元素：

<p lang="en">Hello!</p>
<p lang="en-us">Greetings!</p>
<p lang="en-au">G'day!</p>
<p lang="fr">Bonjour!</p>
<p lang="cy-en">Jrooana!</p>

|||| - 一般来说，[att|="val"] 可以用于任何属性及其值。
假设一个 HTML 文档中有一系列图片，其中每个图片的文件名都形如 figure-1.jpg 和 figure-2.jpg。就可以使用以下选择器匹配所有这些图像：

    img[src|="figure"] {border: 1px solid gray;}

#### 2.子元素选择器：
您希望选择只作为 h1 元素子元素的 strong 元素，可以这样写：

    h1 > strong {color:red;}

这个规则会把第一个 h1 下面的两个 strong 元素变为红色，但是第二个 h1 中的 strong 不受影响：

    <h1>This is <strong>very</strong> <strong>very</strong> important.</h1>
    <h1>This is <em>really <strong>very</strong></em> important.</h1>

#### 3.相邻兄弟选择器
如果需要选择紧接在另一个元素后的元素，而且二者有相同的父元素，可以使用相邻兄弟选择器（Adjacent sibling selector）

    li + li {font-weight:bold;}
上面这个选择器只会把列表中的第二个和第三个列表项变为粗体。第一个列表项不受影响。


#### 4.伪类（ :focus :checked :not() a:link:visited:hover:active :first-child :lang() ）
这里只介绍一种不常用的:lang

    <html>
    <head>

    <style type="text/css">
    q:lang(no)
       {
       quotes: "~" "~"
       }
    </style>

    </head>

    <body>
    <p>文字<q lang="no">段落中的引用的文字</q>文字</p>
    </body></html>
>我自己试了，不起作用。

#### 5.伪元素 ( :before :after)
伪元素的语法：

    selector:pseudo-element {property:value;}

|||| - :first-line 伪元素

"first-line" 伪元素用于向文本的首行设置特殊样式。

在下面的例子中，浏览器会根据 "first-line" 伪元素中的样式对 p 元素的第一行文本进行格式化：
实例

    p:first-line
    {
        color:#ff0000;
        font-variant:small-caps;
    }
>注释："first-line" 伪元素只能用于块级元素。
注释：下面的属性可应用于 "first-line" 伪元素：
    font
    color
    background
    word-spacing
    letter-spacing
    text-decoration
    vertical-align
    text-transform
    line-height
    clear

|||| - :first-letter 伪元素

"first-letter" 伪元素用于向文本的首字母设置特殊样式：

    p:first-letter
    {
        color:#ff0000;
        font-size:xx-large;
    }

>注释："first-letter" 伪元素只能用于块级元素。
注释：下面的属性可应用于 "first-letter" 伪元素：
    font
    color
    background
    margin
    padding
    border
    text-decoration
    vertical-align (仅当 float 为 none 时)
    text-transform
    line-height
    float
    clear
