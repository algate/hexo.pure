title: React-webpack-app脚手架构建项目一
date: 2017-11-05 17:31:30
categories:
- React
tags:
- react-webpack-app
---

##### 1. 首先，建立项目目录，npm init 初始化 npm 项目

    mkdir react-start
    cd react-start
    npm init

##### 2. 全局安装 Webpack, Babel, Webpack-dev-server

    npm install babel webpack webpack-dev-server -g
<!-- more -->

##### 3. 安装 react, react-dom

    npm install react react-dom --save

##### 4. 安装 Babel 转换器，需要用到插件 babel-preset-react, babel-preset-latest，latest 即最新的 ES 规范，包括了 Async/Await 这些新特性。

    npm install babel-loader babel-core babel-preset-react babel-preset-latest --save

##### 5. 创建项目文件，main.js 即项目入口文件，App.js 即 React 组件主文件

不会命令行的，老老实实的到文件夹右击吧： index.html App.js main.js webpack.config.js

type .  >index.html

##### 6. Webpack 配置
```
var path = require('path');
module.exports = {
    entry: './main.js', // 入口文件路径
    output: {
        path: path.resolve(__dirname, ''),
        filename: 'index.js'
    },
    devServer: {
        inline: true,
        port: 3333
    },
    module: {
        loaders: [
            {
                test: /\.js$/, // babel 转换为兼容性的 js
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'latest']
                }
            }
        ]
    }
}
```

##### 7. 其他文件内容，一些基本的 React 和 ES6 基础，不做过多讲解了。

index.html
```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>React Start</title>
    </head>
    <body>
        <div id="app"></div>
        <script src="index.js"></script>
    </body>
</html>
```

App.js

```
import React from 'react';

class App extends React.Component {

    render() {
        return <div>Hello World</div>
    }
}

export default App

```

main.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('app'))
```
##### 8. 配置 npm scripts, 编辑 package.json
```
"scripts": {
   "start": "webpack-dev-server"
},
```
##### 9. 基本的框架搭建完毕，npm start 然后打开 http://localhost:3333 试试

npm start
