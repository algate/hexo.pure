title: vue-cli脚手架构建项目一问题汇总
date: 2017-06-10 17:31:30
categories:
- Vue
tags:
- vue-cli
---

修改几个个地方（陆续记录），看起来不起眼，其实很重要的。我也是花了很长时间调试才出来的；

修改配置文件，必须 `cnpm` 重新启动项目
* #### babel-polyfill
main.js 即vue项目的入口文件，开头部分需要引入

        import "babel-polyfill"
<!-- more -->
* * * * *

* #### config下index文件 assetsPublicPath
如下图
![](/hexo.pure/images/posts/vue/01.png)

    [右侧箭头]想说的是，原本内容为  '/'。没有小点；
    解决的问题是：**文档发布找文件路径是在当前路径下找相对路径**，否则的话会找绝对路径
    具体为啥，可以百度详查；

* * * * *
* #### static (stylesheel图片路径问题)
如下图所示
![](/hexo.pure/images/posts/vue/02.png)

    【此处关键】解决的问题是：**样式表里引入的背景图片原本会自动加入'static/css'。把背景图识别到了样式css的目录下加上词句后，就可以找到样式表外层目录；**

    >[danger] 需要注意的是：** 样式表里引入的图片路径不能写绝对路径 **
* * * * *

* #### 域名是否开启html5模式(history)
如下图所示
![](/hexo.pure/images/posts/vue/03.png)

【此处关键】图片中注释的一句：mode：'history'；在浏览器域名下不显示'#'，使用的是html5模式；

其实也不是问题，**但是如果和后端配合，前端的项目不在根路径（webapps下），那么就需要路由带 `#` 来控制了**；

******
* #### alias (build下webpack.config.base中exports-resolve下)
如下图所示
![](/hexo.pure/images/posts/vue/04.png)

 [文件路径]但我们在页面中import，图片……需要添加文件路径的时候，写一堆“../../../”等等的路径，费半天劲，此刻不用了，只要设置了上图中的文件路径，就可以在页面中直接写"config/...文件"，开发和打包的时候，vue会自动匹配文件路径，方便又省事。

 >[danger] 需要注意的是：**样式表里图片的路径必须写绝对路径(识别不了css文件里的配置路径--问题2)**一直没有找到解决之道，导致我的项目找个图片写了一堆的“../../../../”

******
* #### jquery引入(不推荐-实际项目用到的地方不是太多)

（1）入口文件main.js中加入![](/hexo.pure/images/posts/vue/05.png)

（2）base.conf.js中添加路径![](/hexo.pure/images/posts/vue/06.png)

（3）步骤2中，和entry同级添加入下图内容：【此处添加如果没有引入webpack】需要引入var webpack = require("webpack")
![](/hexo.pure/images/posts/vue/07.png)

*****
* #### `<a></a>` :active激活状态样式

.router-link-active 路由中用到 hover，当前选中状态，vue给我们提供了一个比较直接的样式(vue提供了简单暴力的方式)

一个项目中出现激活状态的a标签不会只有一处，so需要解决的是，点击不同的模块下，其他模块的激活状态不收影响的问题；

>这个在配置路由的时候也会影响到此处样式的问题。需要保证，有父级路由并且，不能随意变换。

*****
* #### ip

有时候需要配置ip来解决项目中的一些问题

>我做过的项目就遇到过一个问题
设置完代理服务器之后，我们登录单独用cas做了一个项目，当登录后台返回结果之后，如果不配置ip，多个人开发项目的时候，默认返回的都是127.0.0.1。导致不知道返回设备的session可能失效……等等

![](/hexo.pure/images/posts/vue/08.png)

*****
* #### port

启动多个服务器项目，不仅仅是vue，可能需要改变下域名的port。

![](/hexo.pure/images/posts/vue/09.png)
