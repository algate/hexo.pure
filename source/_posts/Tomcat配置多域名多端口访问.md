title: Tomcat配置多域名多端口访问
date: 2016-09-25 17:31:30
categories:
- 工具
tags:
- tomcat
---

话不多说，直接开始
#### 1.安装Java
要使用tomcat，首先要安装Java，并且配置Java环境，这里不介绍如何安装，重点强调安装过程中遇到的问题

```
tomcat.bat
```
<!-- more -->
##### 一.启动一闪而过
tomcat启动服务，一闪而过，只能证明，环境变量配错了。正常的使用java，只需要把安装路径放到系统变量的Path里边，但是Tomcat启动找的却是JAVA_HOME,所以一定要配置java_home的环境变量，具体怎么配，请谷歌

>[info] 如果不知道具体什么错误，可以cmd启动运行startup,会提示有什么错误

##### 二.安装版本问题
启动成功后，报错，就试具体原因了：有个刚启动就报的错，是因为tomcat和java的位数不同，所以安装的时候，最好选择同一版本，要么都是32，要么都是64位；
##### 三.安装位置
tomcat安装，一般都是直接解压放到你想放到的地方就行了。
##### 四.项目代码位置
我把项目放到tomcat下时，放错了地方，导致页面显示空白
  这里需要注意的是：一般放到webapps下就可以了，公司用到的大项目直接在webapps下。
  我把webapps下的东西删除，放上我自己的项目，但是页面就是没有显示出来
 最后我把原安装包解压发现webapps下有好多的文件夹，复制这么多文件放到webapps下

>[info] 我们需要把项目放到webapps下的ROOT文件夹里边。打开浏览器，就可以正常显示了

也许你会说，我直接点击页面就可以浏览了，但是有些时候调试，需要真实的服务器环境来看。

##### 五.多端口多域名配置
接下来就是配置ｔｏｍｃａｔ多域名，多端口的访问问题了：
有三种情况：具体需要那种情况就看自己的需要了。但是修改的是同一个文件：安装目录下的conf文件夹里边的server.xml文件。可以直接看第三种情况，其实可以把前两个情况都解决。

* A.相同的域名，不同的端口访问，这种情况访问同一个项目
    Code:
    ```
        <Service name="Catalina">
            <Connector port="8080" protocol="HTTP/1.1"
                      connectionTimeout="20000"
                      redirectPort="8443" />
            <Connector port="8009" protocol="AJP/1.3" redirectPort="8443" />
            <Engine name="Catalina" defaultHost="localhost">
                <Realm className="org.apache.catalina.realm.LockOutRealm">
                <Realm className="org.apache.catalina.realm.UserDatabaseRealm"
                        resourceName="UserDatabase"/>
                </Realm>
                <Host name="localhost"  appBase="webapps"
                       unpackWARs="true" autoDeploy="true" >
                    <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
                           prefix="localhost_access_log." suffix=".txt"
                           pattern="%h %l %u %t &quot;%r&quot; %s %b" />
                </Host>
            </Engine>
        </Service>
    ```
    在service下找到Connector复制一份
    Code:
    ```
        <Connector port="80" protocol="HTTP/1.1"
                      connectionTimeout="20000"
                      redirectPort="8443" />
    ```
    port的值随意修改成你想要的数字 ，然后在浏览器改端口号，直接可以预览了。

* B.不同的域名访问同一项目（此种方法没什么用，直接可以略过）

    这个怎么操作呢，当然是复制一份<host></host>带标签的内容，修改localhost改为自己想要的内容，比如你想[yourname.com]()就可以改为你想要的，OK了，不过还有个问题需要解决，在第三种情况会有说明，所以直接看三吧

* C.不同的域名不同的端口（或者相同的端口），访问不同的项目

    直接复制一份<Service></Service>(包括标签)

    Code:
    ```
    <Service name="Catalina2">
        <Connector port="8080" protocol="HTTP/1.1"
                  connectionTimeout="20000"
                  redirectPort="8443" />
        <Connector port="8009" protocol="AJP/1.3" redirectPort="8443" />
        <Engine name="Catalina2" defaultHost="localhost">
            <Realm className="org.apache.catalina.realm.LockOutRealm">
            <Realm className="org.apache.catalina.realm.UserDatabaseRealm"
                    resourceName="UserDatabase"/>
            </Realm>
            <Host name="你要的域名（www.baidu.com）"  appBase="安装目录先新建一个文件夹的名字"
                   unpackWARs="true" autoDeploy="true" >
                <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
                       prefix="localhost_access_log." suffix=".txt"
                       pattern="%h %l %u %t &quot;%r&quot; %s %b" />
            </Host>
        </Engine>
    </Service>
    ```
 <img src="/images/posts/tomcat/001.png"/>

 port端口号可以一样
 把webapps复制一份放到安装目录下，更改文件名为appBase的名，把项目放到ROOT下（之前说过了哦！）
 然后启动服务，浏览器访问：[你要的域名:8080/项目的路径文件]() ,妥妥的，你就可以访问你的新文件夹下的新项目了。
