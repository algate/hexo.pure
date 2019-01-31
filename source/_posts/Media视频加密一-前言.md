title: Media视频加密一
date: 2018-01-02 08:31:30
categories:
- Javascript
tags:
- blob
---

#### 1. 前言
现在看到任何我感兴趣的网页都会习惯性的打开调试工具，看看其代码写的怎么样。 有一天，看到了这句 HTML。

```
<video src="blob:http://www.bilibili.com/d0823f0f-2b2a-4fd6-a93a-e4c82173c107"></video>
```
<!-- more -->
再继续看看别的视频网站，你会发现：

现在视频网站，A站，B站，爱奇艺，youku等网站看视频和直播，想下载视频的话，发现地址全变为blob开头的链接了。

>为何会有一个 blob？这个是什么？然后我点击这个链接，被返回了 404！什么情况？用了什么黑科技？一个个问题从脑海中蹦出来。本着学习和钻研的态度(好奇害死猫，处女座的强迫症患了)，于是对此做了一番探索。

下片文章介绍blob [Media视频加密二-Blob对象](http://algate.gitlab.io/2018/01/02/Media%E8%A7%86%E9%A2%91%E5%8A%A0%E5%AF%86%E4%BA%8C-Blob%E5%AF%B9%E8%B1%A1/)

