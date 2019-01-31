title: vue.$set的使用-更新视图
date: 2017-07-08 17:31:30
categories:
- Vue
tags:
- vue
- $set
---

在我们使用vue进行开发的过程中，可能会遇到一种情况：当生成vue实例后，当再次给数据赋值时，有时候并不会自动更新到视图上去；

当我们去看vue文档的时候，会发现有这么一句话：如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。

so，网上查阅资料和文档后得知可以使用 `Vue.$set`

下边是我写过的一个关于图片不同显示代码示例：
<!-- more -->
```
// vue
<ul class="zk_stu_exImg">
    <li v-for="(img,key) in exampleImg">
        <img :src="img.url" @click="isWrong('y',img)">
        <img v-if="img.wrong" class="wrong_flag_img" src="static/img/worng2.png" @click="isWrong('n',img)">
    </li>
</ul>

// wrong属性是新添加的，wrong为true的时候显示2图，wrong为false的时候显示1图
(下边有多余的代码，是我写的，把选中的错误的图片重新保存到arr数组中，看的时候可以不看else)

export default {
    methods:{
        isWrong (yOrn,img){
            if(!img.wrong){
                this.$set(img,'wrong',true);
                this.arr.push(img.url);
                console.log(img);
            } else {
                for(var i=0;i<this.arr.length;i++){
                    if(img.url == this.arr[i]){
                        this.arr.splice(i,1);
                        break;
                    }
                }
                this.$set(img,'wrong',false);
            }
        }
    }
}
```

* 1、通过Vue.set方法设置data属性，如上：

        Vue.set(img,'wrong',false)

* 2、您还可以使用 vm.$set实例方法，这也是全局 Vue.set方法的别名:

        this.$set('info.content', 'what is this?');
