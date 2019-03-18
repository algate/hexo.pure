title: HTML - 特殊标签和属性(随时更新)
date: 2015-07-28 08:31:30
categories:
- HTML
tags:
- 特殊标签
---
1.manifest   页面头部 `<link rel="manifest" href="manifest.json">`

manifest 属性规定文档的缓存 manifest 的位置。

HTML5 引入了应用程序缓存，这意味着 Web 应用程序可以被缓存，然后在无互联网连接的时候进行访问。

应用程序缓存使得应用程序有三个优点：

    离线浏览 - 用户可以在离线时使用应用程序
    快速 - 缓存的资源可以更快地加载
    减少服务器加载 - 浏览器只从服务器上下载已更新/已更改的资源
<!-- more -->
manifest 属性应该被 Web 应用程序中您想要缓存的每个页面包含。

manifest 文件是一个简单的文本文件，列举出了浏览器用于离线访问而缓存的资源。

2.base 单边标签

    base href="http://www.w3school.com.cn/i/"
    base target="_blank"

`<base>` 标签为页面上的所有链接规定默认地址或默认目标。

通常情况下，浏览器会从当前文档的 `URL` 中提取相应的元素来填写相对 `URL` 中的空白。

使用 `<base>` 标签可以改变这一点。浏览器随后将不再使用当前文档的 `URL`，而使用指定的基本 `URL` 来解析所有的相对 `URL`。这其中包括 `<a>`、`<img>`、`<link>`、`<form>` 标签中的 `URL`。

3.`meta`标签的相关属性

    <meta http-equiv="refresh" content="5; url='//algate.github.io/'">
上面meta的功能是, 访问该页面的时候，3秒钟后将自动跳转到url的地址

http://blog.csdn.net/cczhumin/article/details/51241609


