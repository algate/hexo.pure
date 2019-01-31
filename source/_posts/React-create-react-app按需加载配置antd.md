title: React-creat-app按需加载antd
date: 2018-04-17 10:35:30
categories:
- React
tags:
- antd
- add react-app-rewired
---

create-react-app运行代码，在此不做操作演示

### 引入antd

    yarn add antd
修改 src/App.js，引入 antd 的按钮组件。

    import Button from 'antd/lib/button';
修改 src/App.css，在文件顶部引入 antd/dist/antd.css。

    @import '~antd/dist/antd.css';

上述步骤在未运行eject之前是没有问题的。

>但是在实际开发过程中还有很多问题，例如上面的例子实际上加载了全部的 antd 组件的样式（对前端性能是个隐患）。
此时我们需要对 create-react-app 的默认配置进行自定义，这里我们使用 react-app-rewired （一个对 create-react-app 进行自定义配置的社区解决方案）。

下面讲解在运行eject前后，对组件react-app-rewired的不同配置；

##### 1.eject之前，就是默认配置

    /* package.json */
    "scripts": {
    -   "start": "react-scripts start",
    +   "start": "react-app-rewired start",
    -   "build": "react-scripts build",
    +   "build": "react-app-rewired build",
    -   "test": "react-scripts test --env=jsdom",
    +   "test": "react-app-rewired test --env=jsdom",
    }

然后在项目根目录创建一个 config-overrides.js 用于修改默认配置。

    module.exports = function override(config, env) {
      // do stuff with the webpack config...
      return config;
    };
使用 babel-plugin-import#

babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件（原理），现在我们尝试安装它并修改 config-overrides.js 文件。

    $ yarn add babel-plugin-import --dev

    +   const { injectBabelPlugin } = require('react-app-rewired');

    module.exports = function override(config, env) {
    +   config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
        return config;
    };

然后移除前面在 src/App.css 里全量添加的 @import '~antd/dist/antd.css'; 样式代码，并且按下面的格式引入模块。

    // App.js
    -   @import '~antd/dist/antd.css';
    // App.js做如下修改
    - import Button from 'antd/lib/button';
    + import { Button } from 'antd';

是不是代码简洁了许多，并且还实现了按需加载。多美酸爽和惬意。

##### 2.运行eject之后，如果按照上述步骤进行处理，你会发现启动失败了
package.json做如下修改是不行的。即时提示你需要升级react-scripts也是徒劳的。

    /* package.json */
    "scripts": {
    -   "start": "node scripts/start",
    +   "start": "react-app-rewired scripts/start",
    -   "build": "node scripts/build",
    +   "build": "react-app-rewired scripts/build",
    -   "test": "node scripts/test --env=jsdom",
    +   "test": "react-app-rewired scripts/test --env=jsdom",
    }

>其实,package.json是不需要再作出修改的,so,保持eject之后的样子就ok了.

    npm install antd babel-plugin-import --save-dev
    安装按需加载组件之后。

    既然eject已经把配置信息暴露出来了，so 我们需要修改的就是配置信息了

在config -> webpack.config.dev.js 和 webpack.config.prod.js 里（或者 .babelrc 文件）的babel-loader的options配置里，加入如下代码:

    plugins: [
      ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }]
    ]

>如果使用自定义主题的话,我们可以引入react-app-rewire 的 less 插件 react-app-rewire-less 来帮助加载 less 样式
（后续来补充吧）
修改上一个代码中的 `style:'true'`, 如果启用了 style:true 那就必须是装less了。
