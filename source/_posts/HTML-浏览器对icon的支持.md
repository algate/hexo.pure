title: HTML - 浏览器icon的不同支持
date: 2015-06-06 08:31:30
categories:
- HTML
tags:
- icon
---
页面中引用icon
一般情况下都是link标签实现的

```
    <link href="%PUBLIC_URL%/favicon.ico" mce_href="%PUBLIC_URL%/favicon.ico" rel="icon" type="image/x-icon" />
    <link href="%PUBLIC_URL%/favicon.ico" mce_href="%PUBLIC_URL%/favicon.ico" rel="shortcut icon" type="image/x-icon" />
    <link href="%PUBLIC_URL%/favicon.svg" mce_href="%PUBLIC_URL%/favicon.svg" rel="shortcut icon" type="image/x-icon" />
```

chrome下没有要求，只需要link找到href就ok了，不能加载svg和gif动画

fireworks 下就好多了，可以加载svg，把svg做成动画相当漂亮

IE我就懒的想说了，但是要想在IE下显示icon，需要强调的是
1.必须是icon，
2.rel识别的是"icon" 不加shortcut，
3.type的值必须为“image/x-icon”
<!-- more -->
