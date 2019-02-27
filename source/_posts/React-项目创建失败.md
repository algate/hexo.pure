title: React-creat-app创建失败
date: 2017-11-05 18:31:30
categories:
- React
tags:
- react-webpack-app
---
执行命令 create-react-app命令：

![](/hexo.pure/images/posts/react/error01.png)
<!-- more -->

但是执行了好久，安装了好久，当你以为成功的时候。不好意思，他不仅罢工了，连之前话很长时间安装的都delete了，delete，delete了。。。。
不说了，要不，你乖乖的改改安装的源吧，因为他默认调用的npm命令。

查看npm源的命令：

    npm config get registry

设置方法：

    npm config set registry https://registry.npm.taobao.org
    >配置后可通过上面get registry来获取信息

