---
layout: study
title: 对Storage和cookie的封装
tags: ['javascript']
categories: ['cookie','Storage']
header: storage_cookie
tagline: 对Storage和cookie的封装
date: 2016-11-04 17:21:00
loadCss: ['study_relevant']
loadJs: ['study_relevant']
ascription: webacc
brief: 对webstorage和coolie进行了封装，可以进行增删改查操作，并且兼容各个版本的浏览器。
group: navigation
---
<pre>
<textarea class="cm_textarea">
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title>test</title>
</head>
<body>
	<script type="text/javascript">
	var singleton = function( fn ){
	    var result;
	    return function(){
	        return result || ( result = fn .apply( this, arguments ) );
	    }
	}
	var _storage=singleton(function(){
		var lstorage;
		if(window.localStorage){
			lstorage=localStorage;
		}else{
		    var UserData = {
		    userData: null,
		    name: location.hostname,

		    init: function() {
		        if(!UserData.userData) {
		            try {
		                UserData.userData = document.createElement('div');
		                UserData.userData.type = "hidden";
		                UserData.userData.style.display = "none";
		                UserData.userData.addBehavior("#default#userData");
		                document.body.appendChild(UserData.userData);
		                var expires = new Date();
		                expires.setDate(expires.getDate() + 365);
		                UserData.userData.expires = expires.toUTCString();
		            } catch(e) {
		                return false;
		            }
		        }
		        return true;
		    },

		    setItem: function(key, value) {
		        if(UserData.init()) {
		            UserData.userData.setAttribute(key,value);
		        }
		    },

		    getItem: function(key) {
		        if(UserData.init()) {
		            var  v=UserData.userData.getAttribute(key);
		            return v;
		        }
		    },
		    removeItem: function(key) {
		        if(UserData.init()) {
		            UserData.userData.removeAttribute(key);
		        }
		    },
		    //以下三个方法暂时留着,区别Attribute和property
		    getAttr:function(el, prop){
		    	return el[prop] || el.getAttribute(prop);
		    },
		    setAttr:function(el, prop, val){
	    		el[prop] = val;
		    },
		    removeAttr:function(el, prop){
		    	delete el[prop];
		    }
		};
			lstorage=UserData;
		};
		var ls = {
			setLocalStorage : function(k,v){
				lstorage.setItem(k,v);
			},
			getLocalStorage : function(k){
				return lstorage.getItem(k);
			},
			removeLocalStorage:function(k){
				lstorage.removeItem(k);
			},
			clearLocalStorage : function(){
				lstorage.clear();
			}
		};
		return ls;
	})();

	var _cookie=singleton(function(){
		var ck={
			addCookie:function(obj){
				if(typeof(obj)==="undefined"){
					return;
				}
				for(var c in obj){
					var strCookie=c+"="+obj[c]+";"
					// cookieString+=strCookie;
					document.cookie=strCookie;
				}
				// alert(document.cookie)
			},
			getCookie : function(name){
				var strCookie=document.cookie;
				var arrCookie=strCookie.split("; ");
				for(var i=0;i<arrCookie.length;i++){
					var arr=arrCookie[i].split("=");
					if(arr[0]==name){
						return arr[1];
					};
				}
				return "";

			},
			deleteCookie : function(name){
				var date=new Date();
				date.setTime(date.getTime()-10000);
				document.cookie=name+"=v; expires="+date.toGMTString();
			}
		};
		return ck;
	})();
	//需要存储的数据
	var storageJson={
		"name":"bamzc",
		"age":"23",
		"sex":"男"
	};
	_storage.setLocalStorage("name",storageJson.name);
	// _storage.removeLocalStorage("name");
	document.write("我给localStorage赋值："+_storage.getLocalStorage("name"));
    _cookie.addCookie(storageJson);
    // _cookie.deleteCookie("age");
    document.write("<br><br>我添加了一个cookie："+_cookie.getCookie("age"));
	</script>
</body>
</html>
</textarea>
</pre>