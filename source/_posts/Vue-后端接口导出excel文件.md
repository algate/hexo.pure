title: 后端导出excel文件
date: 2018-04-16 14:02:30
categories:
- Vue
tags:
- upload
- blob
---

方法有很多种，这里介绍比较简单的两种方法：

##### 方法一：使用a链接，把后端给的流文件url直接写到href里，浏览器就会自动处理流文件url，直接实现下载；

vue-html：

    <a :href="href_dialog_upload_error" v-show="flag.flag_uploaderror"><el-button type="primary" size="small">导出错误数据</el-button></a>
    <!-- <el-button type="primary" size="small" v-show="flag.flag_uploaderror" @click="J_dialog_export_error">导出错误数据</el-button> -->

<!-- more -->
vue-js:

    data() {
        return {
            href_dialog_upload_error: ''
        }
    }
    // service配置：
    let uploadService = { exportError: baseURL + 'rest/rights/user/export' }；
    // 然后给href赋值(v.excelBatch为错误代码参数)
    this.href_dialog_upload_error = `${uploadService.exportError}?excelbatch=${v.excelbatch}`;

##### 方法二：设置后台返回的responseType属性。使用URL转化为浏览器可识别的url链接来实现；

vue-html：

    <el-button type="primary" size="small" v-show="flag.flag_uploaderror" @click="J_dialog_export_error">导出错误数据</el-button>

vue-js:
>server接口中设置 { responseType: 'arraybuffer' }
返回的接口中，把data文件转为为blob文件，通过URL转化为浏览器可以识别的链接地址；

    // server
    let uploadService = {
        exportError(params) {
            return new Promise((resolve, reject) => {
                axios.get(baseURL + 'rest/rights/user/export', {params: params, responseType: 'arraybuffer'}).then((r) => {
                    resolve(r);
                }).catch((r) => {
                    console.log(r);
                });
            });
        }
    }
    // js
    methods: {
        J_dialog_export_error() {
            let params = {
                excelbatch: this.excelbatch
            };
            uploadService.exportError(params).then(r => {
                console.log(r);
                let blob = new Blob([r.data], {type: 'application/vnd.ms-excel'});
                window.location.href = window.URL.createObjectURL(blob);
            });
        }
    }

>此处如果想指定文件名：可以创建一个a标签。触发a的href并且指定download属性名就可以实现
var link = document.createElement('a');
link.href = window.URL.createObjectURL(blob);
link.download = 'fileName';
link.click();
window.URL.revokeObjectURL(link.href);

URL.revokeObjectURL(之前文章提到过，具体看Media视频加密相关文章)

URL.revokeObjectURL()方法会释放一个通过URL.createObjectURL()创建的对象URL. 当你要已经用过了这个对象URL,然后要让浏览器知道这个URL已经不再需要指向对应的文件的时候,就需要调用这个方法.
具体的意思就是说,一个对象URL,使用这个url是可以访问到指定的文件的,但是我可能只需要访问一次,一旦已经访问到了,这个对象URL就不再需要了,就被释放掉,被释放掉以后,这个对象URL就不再指向指定的文件了.
比如一张图片,我创建了一个对象URL,然后通过这个对象URL,我页面里加载了这张图.既然已经被加载,并且不需要再次加载这张图,那我就把这个对象URL释放,然后这个URL就不再指向这张图了.

还有其他方法，比如说：
    1.创建一个隐藏的 iframe，把 iframe 的 src 指向这个 url，就可以下载了
    2.vue可以使用组件： https://github.com/kennethjiang/js-file-download
