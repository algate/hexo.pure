title: 一台电脑如何管理多个平台SSH KEY
date: 2017-09-25 17:31:30
categories:
- Git
tags:
- Git-SSH
---
** 多平台多个git-SSH密钥，对于我们开发人员来说非常有必要，你要玩转github，coding，gitlib，gerrit，还有你提交代码在公司和别处还得用公司邮箱和XX邮箱区分开，如果你玩过github，恰好你们公司也用git，你是不是还被提交的署名邮箱玩坏了，这里统统都不要，配置全搞定。 **
一台电脑上（Mac os）管理多个平台使用ssh key，可以任意切换，达到多用户（账号）使用不同ssh提交代码。
以下利用 `gerrit` 和 `github` 账号来做例子。

* 1、生成ssh key
```
ssh-keygen -t rsa -C "youremail@yourcompany.com"
```
  <!-- more -->

  >如果出现 `'ssh-keygen'不是内部或外部命令` 如何处理呢？
  在此建议大家下载最新版，跟上时代的步伐，是没有错的.
  a.找到Git/usr/bin目录下的ssh-keygen.exe(如果找不到，可以在计算机全局搜索)
  b.属性-->高级系统设置-->环境变量-->系统变量,找到Path变量，进行编辑，End到最后，输入分号，粘贴复制的ssh-keygen所在的路径，保存；
  重新cmd，执行ssh-keygen,成功！


  <font color="#00f">若一路回车（密码可以不写），这样只会在~/.ssh/ 目录下生成 id_rsa 和 id_rsa.pub 两个文件。为了区分，我们在第一个回车后设置路径：</font>如图所示：
  ![](/hexo.pure/images/posts/git/01.png)
  ```
    Enter file in which to save the key (/root/.ssh/id_rsa):~/.ssh/gerrit_rsa
  ```
  之后回车完成就会出现上图中效果，github也如此。
  ![](/hexo.pure/images/posts/git/03.png)

* 2.服务器端绑定相对应的公钥，这个步骤使必须的，
以github为例：(如图所示就OK了)
![](/hexo.pure/images/posts/git/04.png)

测试是否通了：(github为例)
```
  ssh -T git@github.com
  // 回车
  You've successfully authenticated
```
说明就可以git 命令去除繁琐的乱七八糟的输入了！

* 3. 完善配置config
在.ssh文件夹下创建config文件，（如果没有此文件，可以打开终端，输入 `touch config` 生成此文件）可以用 `touch config` 或者 `nano config` 创建和编辑

编辑Coding：
```
# gerrit
Host IP
    HostName IP
    PreferredAuthentications publickey
    Port 66666 # 如果项目代码地址有端口号需要配置相对应的字段
    IdentityFile ~/.ssh/id_rsa_gerrit
    user git

# github
Host github.com
    HostName github.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa_github
    user git
```
* 4.以此类推，有再多的平台，我也不怕了，妈妈再也不用当心我的东西乱七八糟找不到了

* 5.可能会遇到算法的问题
在config文件中加入：
```
Host *.*.*.*
KexAlgorithms +diffie-hellman-group1-sha1
```

* 6.两个平台是否可以用一个rsa密钥呢。ok，不凡试试。我先拭去了……

我试过了可以成功，就是说，我coding的密钥也可以用github的密钥来上传，user一样
只需要配置下config就OK了，无非就是多加入一个coding的配置
[参考内容: https://coding.net/help/doc/git/ssh-key.html](https://coding.net/help/doc/git/ssh-key.html)

> 如果遇到相关的问题，欢迎留言，如果时间允许，楼主会尽快回复！
