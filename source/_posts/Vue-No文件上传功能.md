title: Vue-文件上传功能(另类不如自己实现)
date: 2017-08-08 17:31:30
categories:
- Vue
tags:
- 文件上传
- elementUI
---
elementUI组件其实已经很方便的使用上传功能，但是有很多弊端，感觉不是很好用，在自己用elementUI的upload实现上传功能感觉很累赘（绑定一堆的方法，绑定一堆的变量，绑定出错还得费时费力去调试……）

* ‘eg’：我就遇到个问题，上传只能上传一个文件，用插件实现的话，还得单独写个，关键还不知道往哪个方法里写，调试了很久也没调好。果断放弃了。

* ‘eg’：选择文件夹，反而还做不到，无语ing，我要做一个选择多张图片，不是234张，是好几十张，让我选择一堆图片，烦不烦，我就选个文件夹不久解决了，element反而做不到。。。

* ‘eg’：存储数据不方便，最主要的就是，绑定一堆乱七八糟的方法和变量，有时候（需要特殊处理的时候）就是不管你怎么操作，就是不对。
<!-- more -->
![](/hexo.pure/images/posts/vue/upload01.png)

```
// html部分：

<el-button type="primary" onclick="chooseSeat.click()" :disabled="flag.onceUpload">导入座位表</el-button>
<input id="chooseSeat" name="files" style="display:none;" type="file" @change="onFileSelect()"
accept="application/vnd.ms-excel"/>
```
    路径选择文件夹
    ```
    <input id="choose" name="files" style="display:none;" type="file" @change="onFileSelect()" multiple="multiple" accept="image/png,image/jpeg,image/jpg" webkitdirectory  directory/>
    ```
```
// javascript部分：

onFileSelect(){
    var oFiles = document.querySelector("#chooseSeat").files;
    for (var i=0;i<oFiles.length;i++){
        this.files.push(oFiles[i]);
    }
    this.startUpload();
},
startUpload(){
    let v = this;
    let formData = new FormData();
    for (var i = 0, file; file = this.files[i]; i++) {
        formData.append('file', file);
        // 根据需要这里可能需要作出不同的修改：formData.append(file.name, file);
    }
    formData.append('deptid',v.curGrade.id);
    formData.append('code',v.curGrade.code);
    formData.append('flag',v.resampleFlag?1:0);
    console.log(formData);
    adminService.importTeachingStudent(formData).then(function(r){
        // 操作
    })
},
```
    路径选择文件夹处理图片
    ```
    for (var i=0;i<oFiles.length;i++){
        var type = oFiles[i]['type'];
        if(/^image/g.test(type)){
            this.files.push(oFiles[i]);
        }
    }
    ```
