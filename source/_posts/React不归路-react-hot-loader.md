title: react不归路-react-hot-loader
date: 2017-11-06 18:31:30
categories:
- React
tags:
- react-hot-loader
---

##### 官网原话：
React Hot Loader is a plugin for Webpack that allows instantaneous live refresh without losing state while editing React components.

<!-- more -->
有人会问 webpack-dev-server 已经是热加载了，能做到只要代码修改了页面也自动更新了，为什么在 react 项目还要安装 react-hot-loader 呢？其实这两者的更新是有区别的，webpack-dev-server 的热加载是开发人员修改了代码，代码经过打包，重新刷新了整个页面。而 react-hot-loader 不会刷新整个页面，它只替换了修改的代码，做到了页面的局部刷新。

简单的讲，就是使用 react 编写代码时，能让修改的部分自动刷新。但这和自动刷新网页是不同的，因为 hot-loader 并不会刷新网页，而仅仅是替换你修改的部分，也就是上面所说的 without losing state。

##### 下面来说说怎么来配置 react-hot-loader 。
我是通过官方的create-react-app创建的项目的修改
* 步骤1：

    // 安装 react-hot-loader
    npm install --save-dev react-hot-loader

* 步骤2：在 webpack.config.dev.js 的 entry 值里加上 react-hot-loader/patch，一定要写在entry 的最前面，如果有 babel-polyfill 就写在

babel-polyfill 的后面。
```
  entry: [
    // We ship a few polyfills by default:
    require.resolve('./polyfills'),
    // add react-hot-loaders by algate
    require.resolve('react-hot-loader/patch'),
  ]
```
网上好多人都没有写require.resolve()，直接把上述代码放进去也ok哦

步骤3：

最后这个操作就是在页面的主入口，比如我的是 index.js 添加些代码

```
import App from './page/App';
import { AppContainer } from 'react-hot-loader'; // 新添加

const render = (App) => {
    ReactDOM.render(
        <AppContainer><App /></AppContainer>, document.getElementById('root')
    );
}
render(App)
// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./page/App', () => {
        render(App)
    })
}
```
大功告成，去页面实践下吧！
