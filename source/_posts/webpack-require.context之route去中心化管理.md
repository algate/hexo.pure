title: webpack-require.context()之route去中心化管理
date: 2017-08-20 17:31:30
categories:
- Webpack
tags:
- route
---
需求：当我vue-routes配置的时候，嫌弃require('')引入的路径太长，想用变量替换他，为了美观，也没了精简代码。

当你在开发一个大型单页面应用的时候，项目之初一般做法是所有的路由规则都维护在一个route.js的文件里。
<!-- more -->
```
const router = new VueRouter({
    routes: routes
})
// routes.js
const routes = {
    path: 'usermanage',
    component: require('page/systemManagement/usermanage/usermanage.vue'),
    children: [
              {
                path: 'student_manage',
                component: r => require.ensure([], () => r(require('page/systemManagement/usermanage/usermanage.student_manage.vue')))
              },
              {
                path: 'user_audit',
                component: r => require.ensure([], () => r(require('page/systemManagement/usermanage/usermanage.user_audit.vue')))
              },
              {
                path: 'role_permission',
                component: r => require.ensure([], () => r(require('page/systemManagement/usermanage/usermanage.role_permission.vue')))
              },
              {
                path: 'role_assign',
                component: r => require.ensure([], () => r(require('page/systemManagement/usermanage/usermanage.role_assign.vue')))
              },
              {
                path: 'class_manage',
                component: r => require.ensure([], () => r(require('page/systemManagement/usermanage/usermanage.class_manage.vue')))
              }
    ]
};
```

这里的require.ensure上一篇文章 [webpack.ensure](https://algate.gitlab.io/2017/08/11/webpack-webpack.ensure/)介绍了：webpack的语法，实现按需加载的。

随着业务代码的增长路由很快边长，看起来乱糟糟(怪我强迫症患了)：

刚开始发现路径太长，用一个变量替换，还用es6语法:

    const user_path = `page/systemManagement/usermanage/`;

上边的component改为了:

    `component：r=>(require(`${user_path}usermanage.vue`))`

报错了，刚开始以为是es6语法写错了，改成字符串的写法，还是报错，我就觉得这不应该了，一个念头飘过，require不支持变量的写法，baidu，google…… oh，小样，果然如此，node不支持，不过也发现了另外一个好东西，require.context。

简单说下context()的用法：[官网地址](http://www.css88.com/doc/webpack2/guides/dependency-management/)

require的context方法

你还可以使用 require.context() 方法来创建自己的上下文（模块）。

你可以给这个方法传3个参数：要搜索的文件夹目录，是否还应该搜索它的子目录，一个匹配文件的正则表达式。

webpack会在构建的时候解析代码中的 require.context() 。

语法如下：

    require.context(directory, useSubdirectories = false, regExp = /^\.\//)

示例:

    require.context("./test", false, /\.test\.js$/);
    // （你创建了）一个test文件夹下面（不包含子目录），能被require请求到，所有文件名以 `.test.js` 结尾的文件形成的上下文（模块）。

    require.context("../", true, /\.stories\.js$/);
    // （你创建了）一个父级文件夹下面（包含子目录），所有文件名以 `.stories.js` 结尾的文件形成的上下文（模块）。

上下文模块 API

一个上下文模块导出一个（require）方法，这个方法可以接收一个参数：请求的对象。 A context module exports a (require) function that takes one argument: the request.

导出的方法有3个属性： resolve, keys, id。
```
    resolve 是一个函数，它返回所请求的对象被解析后得到的模块id。

    keys 也是一个函数，它返回一个数组，由所有可能被上下文模块处理的请求的对象（译者注：参考下面第二段代码中的key）组成。

    比如，在你想引入一个文件夹下面的所有文件，或者引入能匹配正则表达式的文件，你可以这样：

    function importAll (r) {
        r.keys().forEach(r);
    }
    importAll(require.context('../components/', true, /\.js$/));

    var cache = {};
    function importAll (r) {
        r.keys().forEach(key => cache[key] = r(key));
    }
    importAll(require.context('../components/', true, /\.js$/));
    // 在构建时，所有被require的模块都会被存到（上面代码中的）cache里面。
```

借鉴了网上内容 [传送门](https://github.com/wuchangming/blog/blob/master/docs/webpack/require-context-usage.md)
但是直接引用到vue-route里边还是有问题的，你还需要像上边提到的例子中，有多少子路由，还得在子页面中引入自己相关的路由，所以，为了一个文件就搞定的事，我开始了漫长且兴奋的研究。

ok，过程的尝试和研究就不细说了，直接上代码。当然，你也可以先自己研究，实在出不来，再查看我的代码，毕竟，你可以很清楚的明白他的实现过程。


```
{
    path: 'usermanage',
    component: r => require.ensure([], () => r(require('page/systemManagement/usermanage/usermanage.vue'))),
    children: (r => {
        return r.keys().map(key => {return {
            path: key.split('.')[2],
            component: r(key)
        }});
    })(require.context('page/systemManagement/usermanage/',false,/usermanage\.\w+\.vue$/)),
}
```
上例中的path 自己可以适当的改下，用正则都行。

不过遗憾的是，require.comtext()中第一个参数，依旧只能写字符串路径。其实，这个才是我要解决的问题。到最后也是没有解决。

不过还好学到了另外的知识，分享出来。
ok，这么高大上的东西，留在项目中，让参与项目的人颤抖吧。开玩笑啦，大家一起学习，一起进步。
