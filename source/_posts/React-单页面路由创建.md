title: React-单页面路由创建
date: 2018-05-17 20:30:30
categories:
- React
tags:
- react路由
---
react 渲染路由的方法：
HashRouter  hash实现路由
BrowserRouter   H5 Api实现路由跳转

addEventListener('hashchange');

histor.pushState({p:path})
add('popstate', e => {

})

context.js

HashRouter.js
新增的方法：

{Provider , Consumer} React.createContext();
export {Provider, Consumer}

export default class HashRouter extends Component{
    constructor(){
        super();
    }
}

Route.js
 return <Comsumer>
    {state=>{

        }}
 </Comsumer>
