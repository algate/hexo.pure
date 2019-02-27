title: vue常用组件使用以及配置
date: 2017-07-26 17:31:30
categories:
- Vue
tags:
- vue组件
---

#### * 路由
```
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引用路由配置文件
import routes from './config/routes'
// 使用配置文件规则
const router = new VueRouter({
    routes: routes
})
// 跑起来吧
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
```
<!-- more -->
#### * elementUI
```
// 引入ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// import 'style/elementUI/elementUI.css'
Vue.use(ElementUI)
```

#### * axios 发送请求 (推荐使用fetch推荐使用)
```
// axios 官方推荐API
import axios from 'axios'
Vue.prototype.$http = axios
```

>[info]可以把接口封装到services里边，防止接口修改维护时，可以很快直接的定位。

```
import axios from 'axios'
let adminService =  {}；
adminService = {
    getUser(params) {
        return new Promise((resolve, reject) => {
            axios.post(baseURL + '/getUser',params).then(function(res) {
                resolve(res);
            }).catch(function(reason){
                console.log(reason);
            });
        });
    },
}
export {
    adminService
}
```
如果本地测试的话，可以做到前后端分离，只不过要保存一份json格式的文件。以方便测试。这样做，好处多多。本人在搭建环境的时候，逐渐总结和积累的。
![](/hexo.pureimages/screenshot_1509954871060.png)

#### * vuex数据
```
// 组件之间数据传递
import Vuex from 'vuex'
Vue.use(Vuex)
import store from './config/vuex/store'
```
store.js---保存存储数据的
```
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    // 定义状态
    state: {
        // 静态的。
        classfiyList:[
            {"enable":"0","name":"管理员","value":"1"},
            {"enable":"0","name":"领导","value":"2"},
            {"enable":"0","name":"老师","value":"3"},
            {"enable":"0","name":"学生","value":"4"}
        ],
        trainmodelQuery:{},
    }
    mutations: {
        getTrainmodelQuery(state,trainmodelQuery){
            state.trainmodelQuery = trainmodelQuery
        }
    }
```
```
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
```
子页面需要把数据存储到store里边
```
this.$store.commit('getTrainmodelQuery',params);
```
