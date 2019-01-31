title: Js - url参数拼接
date: 2018-05-14 14:36:30
categories:
- Javascript
tags:
- params
---
url已经带参数还没有带都可以使用
url传参以及get请求参数

    paramsJoin(url, params) {
        let paramsArray = [];
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&');
        } else {
            url += '&' + paramsArray.join('&');
        }
        return url;
    }
<!-- more -->
