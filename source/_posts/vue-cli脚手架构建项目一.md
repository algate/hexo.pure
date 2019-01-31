title: vue-cli脚手架构建项目一
date: 2017-06-08 17:31:30
categories:
- Vue
tags:
- vue-cli
---

先安装nodejs，node -v测试，可能需要配置环境变量；

以下 `npm` 都可以用 `cnpm` 命令来提高安装效率，需要安装cnpm

        npm install vue-cli -g

这个无用多说，全局安装vue-cli。
<!-- more -->

#### 1.开始创建项目

* 使用vue初始化基于webpack的新项目

        vue init webpack your-project

    >项目创建过程中会提示是否安装eslint，可以选择不安装，否则项目编译过程中出现各种代码格式的问题；项目创建完成后，安装基础模块；（团队中开发人员比较多之后，每个人的代码规范层次都不一样，建议加入，可以统一书写规范，好处多多哦！）

        cd your-project;
        npm install;

* 安装完成之后可在开发模式下运行项目并预览项目效果

        npm run dev;

* 如果项目可以正常启动，即可继续安装vue的辅助工具

        npm install vue-router --save （路由管理模块）
        npm install vuex --save （状态管理模块）
        npm install axios(vue-resource) --save （网路请求模块）
        ……

