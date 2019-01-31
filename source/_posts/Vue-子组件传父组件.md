title: vue学习-子组件传值
date: 2017-10-08 17:31:30
categories:
- Vue
tags:
- vue
- $emit
---

构建项目在这里不做介绍 , 直接上关于组件传递数据的代码吧

** 我在这里做的是一个关于弹层的删除操作例子(弹层是自己写的一个组件，没有用elementUI、iView等框架) **

>实现弹层的显示隐藏有很多种方法。后续我会写成文档添加到blog，欢迎关注！

#### 父组件
html:
```
// 点击按钮触发事件操作 this.flag.flag_dialog_delete = true;
// 组件dialogDel上@close="close",你们知道哪个是子组件的close，哪个是父组件的close么？
// 不凡自己试试，如果不知道答案欢迎评论，我做正确回答

<div v-show="flag.flag_dialog_delete">
    <dialogDel @close="close"></dialogDel>
</div>
```
<!-- more -->
Js:
```
// 子组件添加进父组件

import dialogDel from './user_dialog/user_delete';

components: {
    dialogDel
}

data () {
    return {
        flag: {
            flag_dialog_delete: false
        }
    }
}

```

#### 子组件
html：
```
<i class="el-icon-close right" @click="close"></i>
```
js
```
// method: 对象里添加方法如下 (上题中的哪个close？)
close () {
    this.$emit('close');
}
```

#### 父组件
Js：
```
// 处理子组件emit到父组件的事件
// method: 对象里添加方法如下 (上题中的哪个close？)

close () {
    this.flag.flag_dialog_delete = false;
}

```
