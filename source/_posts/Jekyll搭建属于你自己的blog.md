title: Jekyll博客创建-环境配置及安装
date: 2017-06-25 17:31:30
categories:
- 文档
tags:
- jekyll
<!-- banner: /images/posts/sublime.jpg -->
---

前人栽树，后人乘凉。多谢各位大牛的技术文档，让我可以站在巨人的肩膀上眺望远方！(不过在windows上走流程有各种坑)下边是我结合制作自己博客写的总结：（非常建议Windows下用hexo环境创建博客，jekyll下问题多多，坑坑多多）
本人使用Jekyll搭建的博客地址:[https://algate.github.io/](https://algate.github.io/)

<!-- more -->
不知为何，master上传代码之后，加了分页显示的内容展示不出来。
所以原jekyll代码放在了另一个地方,欢迎大家star —— [传送门](https://github.com/algate/algate-blog)

mkdir Algate's Site

<img src="/hexo.pure/images/posts/jekyll/001.png">

在Windows环境下和其他环境系统下安装内容和方法有所不同，此处只介绍windows下安装方法
windows环境下安装；
操作说明连接地址：[http://www.madhur.co.in/blog/2011/09/01/runningjekyllwindows.html](http://www.madhur.co.in/blog/2011/09/01/runningjekyllwindows.html)
#### 1. 安装 Ruby

官网：[http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/)

测试：Ruby是否安装成功，执行命令ruby -v

注意：勾选 “Add Ruby executables to your PATH”，安装路径不能包含空格

#### 2.安装DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe
地址：在步骤一的官网地址里
这里需要特别注意：

<img src="/hexo.pure/images/posts/jekyll/002.png">

要下载相对应的版本
步骤：在命令窗口下切换到安装目录，并执行以下命令
C:\Devkit 下：
~~~
ruby dk.rb init
notepad config.yml
~~~
在打开的记事本窗口中，末尾会自动添加新的一行- C:\Ruby…-x64。（相对应的安装路径）

回到命令行窗口内，审查（非必须）并安装。
~~~
ruby dk.rb review

ruby dk.rb install
~~~

测试：gem是否安装成功，执行命令gem -v

#### 3.到想要创建站点项目的本地路径下
步骤：在命令窗口下执行以下命令
可以更改源，可以直接略过直接安装jekyll
（但是国内你就不要跳过了）详细方法连接地址：[http://blog.csdn.net/rxm1989/article/details/40050185](http://blog.csdn.net/rxm1989/article/details/40050185)
~~~
//更换gem源
gem sources --remove https://rubygems.org/
gem sources -a https://ruby.taobao.org/
|~~|此处有错，截止到发稿时，镜像地址已经改变，地址为：[http://gems.ruby-china.org/](http://gems.ruby-china.org/)
gem sources -a http://gems.ruby-china.org/

//查看gem源
gem sources -l

清空源缓存
gem sources -c

更新源缓存
gem sources -u

//更新gem
gem update --system
~~~

//安装jekyll
gem install jekyll
是否安装成功
测试：

坑：（提醒 ridk install）- 但是呢你根本下载不下来，网上不好找，终于找到一个
连接地址：[https://www.jianshu.com/p/181e3fe0b545](https://www.jianshu.com/p/181e3fe0b545)

<img src="/hexo.pure/images/posts/jekyll/003.png">

测试：gem是否安装成功，执行命令gem -v

#### 4.安装python（可以直接略过直接看第七步骤）
地址：[https://www.python.org/downloads/release/python-2714/](https://www.python.org/downloads/release/python-2714/)
需要手动配置环境变量

#### 5.安装 Easy Install

下载distribute_setup.py

地址：[http://pypi.python.org/pypi/distribute](http://pypi.python.org/pypi/distribute)
（官网下载的py文件一直执行不成功）换成被人改好的文件执行成功了
下载地址：[https://pan.baidu.com/s/1jG2bYbs](https://pan.baidu.com/s/1jG2bYbs)

把此文件单独放到python安装根目录下

命令：在python根目录下执行：python distribute_setup.py

判断是否安装成功，网上的测试在Windows下有问题：
测试：Easy Install 是否安装成功，执行命令easy_install --version
测试是否安装成功需要找到python根目录下找相关路径 （Lib\site-packages\easy_install.py）
例如：C:\Python27\Lib\site-packages
然后执行 easy_install.py  --version(.py文件后缀必须添加，负责永远对不了-我的电脑如此)

此处问题较多，再加上官网也没有详细的结束，会长时间尝试安装，大坑啊！
网上解决方法[https://jingyan.baidu.com/article/09ea3ede27f88ac0aede3900.html](https://jingyan.baidu.com/article/09ea3ede27f88ac0aede3900.html)

#### 6.安装 Pygments


#### 7.（可以是第四步）。
jekyll new algateJekyll

<img src="/hexo.pure/images/posts/jekyll/004.png">

然后在文件夹下可以自动生成文件夹，初始内容如下图所示

<img src="/hexo.pure/images/posts/jekyll/005.png">

8.cd algateJekyll
jekyll serve
我这执行启动服务的时候，出现了下列报错

<img src="/hexo.pure/images/posts/jekyll/006.png">

需要安装bundler（gem install bundler）
可能需要重新打开命令窗口执行server

jekyll --serve --watch 命令将开启实时更新，修改文件后在浏览器中刷新就可看到效果，对本地调试很有帮助；

至此，简单的jekyll服务搭建完成
（4-6是为了高亮显示所需要的插件）


仿照[https://themebetter.com/](https://themebetter.com/) 主题制作属于自己的blog [传送门](https://algate.github.io/)
