title: ES6-fetch
date: 2018-04-19 18:00:30
categories:
- Es6
tags:
- fetch
---
```
let fetchApi = (url, type, params) => {
    return fetch(`${baseURL + url}`, {method: type, body: JSON.stringify(params)}).then(
        response => response.json()
    ).catch(error => console.error('Error:', error));
};
export default fetchApi;
```
<!-- more -->
Get请求需要对params做处理。
下边给出最简单直接的修改处理


    let params = {}; // 参数
    let temp = Object.keys(params).map(key => `${key}=${params[key]}`); // 转化成带等号的数组
    <!-- 对url的处理 -->
    if (url.search(/\?/) === -1) {
        url += '?' + temp.join('&');
    } else {
        url += '&' + temp.join('&');
    }
