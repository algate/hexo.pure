title: Vue-实现分步骤流程效果
date: 2017-08-15 17:31:30
categories:
- Vue
tags:
- Step步骤样式
- elementUI
---

实现效果如下：

![](/images/posts/vue/step01.png)

element实现方法：[官网通道](http://element.eleme.io/#/zh-CN/component/steps)
<!-- more -->
1.element实现放在一个页面，加入一个步骤内容太多，有时候页面又多。一个代码文件绑定数据，方法，我想知道你得写多少行代码才能填满你肚子，人要知足啊！就是写在里边，要维护的话，你找吧，土里边找土疙瘩，累死你，如果你写的还好，如果别人来看你写的，或者你看别人写的，你是不是该骂街了。当然也可以用路由拆成模块。

2.样式修改，看样子官网的可定制化还挺高，数字，包含状态的，包含描述的，横着的，竖着的……可是改起来，好，好好改吧，认认真真的。万一需求非要按设计稿的来，哦，好吧，这改组件样式的时间我早自己写样式的时间出来了，好修改好维护。

```
<div class="zk_tm_header">
    <ul class="zk_tm_progress">
        <li>
            <p class="zk_tmpg_title">导入座次表</p>
            <p class="zk_tmpg_box"><span class="spanNum" :class="{'spanProgress':path>0}">1</span></p>
        </li>
        <li>
            <p class="zk_tmpg_title">导入学籍照</p>
            <p class="zk_tmpg_box"><span class="spanline" :class="{'spanProgress':path>1}"></span><span class="spanNum" :class="{'spanProgress':path>1}">2</span></p>
        </li>
        <li>
            <p class="zk_tmpg_title">采集样本</p>
            <p class="zk_tmpg_box"><span class="spanline" :class="{'spanProgress':path>2}"></span><span class="spanNum" :class="{'spanProgress':path>2}">3</span></p>
        </li>
        <li>
            <p class="zk_tmpg_title">位置校准</p>
            <p class="zk_tmpg_box"><span class="spanline" :class="{'spanProgress':path>3}"></span><span class="spanNum" :class="{'spanProgress':path>3}">4</span></p>
        </li>
        <li>
            <p class="zk_tmpg_title">样本训练</p>
            <p class="zk_tmpg_box"><span class="spanline" :class="{'spanProgress':path>4}"></span><span class="spanNum" :class="{'spanProgress':path>4}">5</span></p>
        </li>
        <li>
            <p class="zk_tmpg_title">识别检测</p>
            <p class="zk_tmpg_box"><span class="spanline" :class="{'spanProgress':path>5}"></span><span class="spanNum" :class="{'spanProgress':path>5}">6</span></p>
        </li>
    </ul>
</div>
<router-view @fatherpath="fatherpath"></router-view>
```
子步骤，我是通过路由来实现的，页面代码量少，方便自己查看，关键别人来维护的话也一目了然。
到了第几步骤，需要子路由给父级路由传值
代码如下：（跳转到步骤2，就设置为2，然后通过绑定的fatherpath传递给父组件）；

```
data() {
    return {
        path:1
    }
}
created () {
    this.setPath()
},
methods:{
    setPath () {
        this.$emit('fatherpath',this.path);
    },
}
```
