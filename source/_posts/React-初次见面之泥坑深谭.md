title: React-初次见面之泥坑深谭
date: 2017-11-01 17:31:30
categories:
- React
tags:
- react
---

#### 1.刚创建完项目的package.json文件如下
![](/images/posts/react/01.png)
<!-- more -->
![](/images/posts/react/02.png)
生成项目后，脚手架为了“优雅”... ...隐藏了所有的webpack相关的配置文件，此时查看“”项目名称“”文件夹目录，会发现找不到任何webpack配置文件。执行以下命令：
```
    cnpm run eject
```
执行完毕后，显示如下：
![](/images/posts/react/03.png)
![](/images/posts/react/04.png)

项目文件夹下会多出config和scripts的文件夹，里边是关于webpack的配置文件
******
####  2.修改默认port
想要更改默认create-react-app的port（默认3000），只需要在前边打开配置文件的基础上（否则找不到scripts文件夹），找到start.js 找到const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000；更改3000为你想要的端口号就行了。

![](/images/posts/react/05.png)
******
