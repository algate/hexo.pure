title: Vue - 常见问题汇总
date: 2018-03-25 06:31:30
categories:
- Vue
tags:
- vue问题汇总
---

##### 1.class样式问题：
![](/images/posts/vue/wenti/01.png)

    <span class="c_v_i_state" :class="[video == '1'?'bgcolor1aaf60':video == '2'?'bgcolor2dabff':video == '3'?'bgcolorff8b2d':'']">{{video == '1'?'正在直播':video == '2'?'即将开始':video == '3'?'直播回放':''}}</span>

除了三元运算符，也可以用普通的方法实现：

    <span class="c_v_i_state" :class="{'bgcolor1aaf60':video == '1'}" v-if='video == 1'>正在直播</span>
    <span class="c_v_i_state" :class="{'bgcolor2dabff':video == '2'}" v-if='video == 2'>即将开始</span>
    <span class="c_v_i_state" :class="{'bgcolorff8b2d':video == '3'}" v-if='video == 3'>直播回放</span>
<!-- more -->

##### 2.有关数据绑定的问题


    <span class="c_digit" v-for="num in num_visit_arr" :key="num"><i :class="'iconfont icon-shuzi'+num"></i></span>

`:class="'iconfont icon-shuzi'+num"` 中，num是变量，`iconfont icon-shuzi`则是字符串。
##### 3.其他问题后续更新

```
代码片段
```
解析
