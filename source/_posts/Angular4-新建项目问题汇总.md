title: Angular - 新建项目问题汇总
date: 2017-12-06 08:31:30
categories:
- Angular
tags:
- Angular
---
修改几个个地方（陆续记录），看起来不起眼，其实很重要的。我也是花了很长时间调试才出来的；
1.angular-cli 引入 scss修改配置信息：
![](/images/posts/angular/01.png)
<!-- more -->
******
2.如下图所示：（导入bootstrap和jquery）
![](/images/posts/angular/02.png)
******
3.更改angular端口号
这里需要注意：按照网上的教程需要更改
#### “node_modules/angular-cli/lib/config/schema.json”
此路径下文件的内容，如图：
![](/images/posts/angular/03.png)
而我的路径在
![](/images/posts/angular/04.png)
但是，更改默认的端口号之后，页面，项目报错，一直未找到问题原因
