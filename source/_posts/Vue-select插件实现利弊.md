title: Vue-select插件实现利弊
date: 2017-08-12 17:31:30
categories:
- Vue
tags:
- select
- elementUI
---
element实现select功能：

组件功能确实还挺丰富的，当时绑定的时候，返回的是字符串，好不容易绑定上对象，还要绑定什么value-key属性，其实压根不知道干嘛用，这还不算，当需要绑定值为对象时，绑定value，key，{{xxx}}。他们通过什么来绑定model，都会或多或少出现问题：这就尴尬了。
正常的：如下代码也就oK了。
```
<select class="custom_select" v-model="resource" @change="changeResource(resource)" placeholder="">
    <option v-for="(resource,key) in resourceList" :value="resource">{{resource.name}}</option>
</select>
```
<!-- more -->
变态的element:（绑定的key，label，value你会把自己搞懵逼的，不写，控制台还报错警告。这成何体统。去超市买个东西，你把醋和酱油放一块买，分开还不单卖了？没有标签，没有把打开盖子，醋和酱油，有的还分不清楚，这合适么？搞笑的逻辑）；

>[info]（当然也有好处：比如要在下拉框中不仅仅显示文字，还要显示图片）这个就很好用

```
<el-select v-model="changeStu.loginname" @change="changeStuName" filterable placeholder="请选择学生">
    <el-option
        v-for="stu in studentNameLists"
        :key="stu.loginname"
        :label="stu.name"
        :value="stu.loginname">
        <span>{{stu.name}}</span>
        <img :src="imgSrc(stu.loginname)" >
        <div class="imgBak"><img :src="imgSrc(stu.loginname)" ></div>
    </el-option>
</el-select>
```
