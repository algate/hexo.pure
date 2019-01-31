title: CSS3-flexbox
date: 2018-12-14 16:35:30
categories:
- CSS3
tags:
- flexbox
---

#### 关于flex的内容不说太多，网上太多，再次只记录如何使用了
只要用flex布局的，添加一下内容

```
    /*设置body为伸缩容器*/
    display: -webkit-box;/*老版本：iOS 6-, Safari 3.1-6*/
    display: -moz-box;/*老版本：Firefox 19- */
    display: -ms-flexbox;/*混合版本：IE10*/
    display: -webkit-flex;/*新版本：Chrome*/
    display: flex;/*标准规范：Opera 12.1, Firefox 20+*/

    /*伸缩项目换行*/
    -moz-box-orient: vertical || horizontal;
    -webkit-box-orient: vertical || horizontal;
    -moz-box-direction: normal || reverse;
    -webkit-box-direction: normal || reverse;
    -moz-box-lines: multiple || single;
    -webkit-box-lines: multiple || single;
    -webkit-flex-flow: column wrap || row / nowrap;
    -ms-flex-flow: column wrap || row / nowrap;
    flex-flow: column wrap || row / nowrap;
```
<!-- more -->
```
    <!-- 伸缩项目具体的分布方式 -->
    -moz-box-pack: justify;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
```
```
    <!-- 伸缩项目基线对其方式 -->
    -moz-box-align: stretch || baseline || center || start || end;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    -webkit-align-items: stretch;
    align-items: stretch;
```
>需要注意的是：
    - 兼容性为主
    - orient 另一个方向的字段为 horizontal(相对方向的水平)
    - box-line 只在一行显示改为single
    - flex-flow 是 flex-direction和 flex-wrap 缩写
    行用 row 列用 column 不换行用 nowrap
    -stretch 伸缩项目拉伸填充整个伸缩容器

##### 如果是伸缩子项目
按照比例添加如下代码
```
    -moz-box-flex: 1;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    -webkit-flex: 1;
    flex: 1;
```
>需要注意的是
    - 如果一个元素这是了宽度没有flex-1，那么剩下的将占用除去宽度意外的剩余空间
    - 如果要这是排序 默认值是1开始的。
```
    -moz-box-ordinal-group: 2;
    -webkit-box-ordinal-group: 2;
    -ms-flex-order: 2;
    -webkit-order: 2;
    order: 2;
```

暂时先到这里，后期再加……


