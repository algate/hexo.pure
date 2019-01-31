title: Push到github时，频繁输入用户名和密码
date: 2017-09-26 17:31:30
categories:
- Git
tags:
- github
---

#### 问题
此问题之前没有出现的，直到最近一次，项目需要，增加了项目SSH密钥之后，就出现了title中的问题。尴了个尬 <i class="icon-tongue"></i>

#### 原因
原因是使用了https方式 push
这种方式产生的原因，一般是我们clone是一定是使用了http的方式
例如我们在github上创建了一个项目，然后我们clone到本地时使用了http/https而非git
![](/images/posts/git/05.png)
```
git clone https://github.com/***/***.git
```
<!-- more -->
#### 解决方法
```
  git remote -v
```
输出项目的克隆地址

    origin  https://github.com/……/..hexo.git (fetch)
    origin  https://github.com/……/..hexo.git (push)

移出旧的http的origin
```
git remote rm origin
```
 添加新的git方式的origin
```
git remote add origin git@github.com:***/***.git
```
我们在查看一下push方式

输入第一条命令 `git remote -v` 得到了新的git方式，然后push试下是否还需要输入繁琐的用户名和密码

##### 大功告成！

> 如果遇到相关的问题，欢迎留言，如果时间允许，楼主会尽快回复！
