'use strict'

var path = require('path');
var webpack = require('webpack');
var glob = require("glob");
//分离CSS和JS文件
var ExtractTextPlugin = require('extract-text-webpack-plugin');

//webpack插件
var plugins = [
    //提公用js到common.js文件中
    new webpack.optimize.CommonsChunkPlugin('js/common.js'),
    //将样式统一发布到style.css中
    new ExtractTextPlugin("css/[name].css", {
        allChunks: true,
        disable: false
    }),
    //使用 ProvidePlugin 加载使用率高的依赖库
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
];

var entry = glob.sync("./assets/src/js/**/*.js"),
    cdnPrefix = '',
    buildPath = '/assets/src/dist/',
    publishPath = cdnPrefix + buildPath;
function arrToObj(arr){
    var obj = {};
    arr.forEach(function(v,i){
        var k = path.basename(v,'.js');
        obj[k] = v;
    });

    return obj;
}
var entryObj = arrToObj(entry);

module.exports = {
    debug : true,
    entry : entryObj,
    output : {
        path : __dirname + publishPath,
        filename : 'js/[name].js',//打包后的文件名
        publicPath : publishPath, //网站运行时的访问路径。
        chunkFilename:"[id].js?[chunkhash]"
    },
    module : {
        loaders : [{
            test : /\.css/,
            loader : ExtractTextPlugin.extract(
                "style-loader", "css-loader")
        },{
            test : /\.(jpg|png|gif)$/,
            loader : "file-loader?name=images/[hash].[ext]"
        },{
            test : /\.js/,
            exclude: /node_modules|vue\/dist/,
            loader: 'babel'
        }]
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extension: ['', '.js'],
        //别名
        alias: {
            jquery: path.join(__dirname, 'assets/base/jquery-2.1.4')
        }
    },
    plugins: plugins,
    devtool: '#source-map'
}