title: upload导入表格图片等，显示进度条(axios实现)
date: 2018-02-26 17:31:30
categories:
- Vue
tags:
- upload
- progress
---

基础代码部分搭建：请访问另一篇博客 [dialog弹层组件全面解析-实现思路一](https://algate.gitlab.io/2018/02/26/Vue-dialog%E5%BC%B9%E5%B1%82%E7%BB%84%E4%BB%B6%E5%85%A8%E9%9D%A2%E8%A7%A3%E6%9E%90%E4%B8%80/)

>添加编辑数据(一个组件)，删除数据弹层
里边包括多个弹层，不过大都雷同，这篇文章里补充弹层 user_import 子组件相关内容

具体介绍导入和进度条相关内容：
1.正式大型项目为了统一接口，单独把接口封装一个service
<!-- more -->
uploadServices.js

    import axios from 'axios';
    import { baseURL } from 'config/GlobalConfig';
    // axios请求带上cookie配置
    axios.defaults.withCredentials = true;
    let uploadService = {
        uploadExcel (params, config) {
            return new Promise((resolve, reject) => {
                axios.post(baseURL + '/uploadExcel', params, config).then((r) => {
                    resolve(r);
                }).catch((r) => {
                    console.log(r);
                });
            });
        }
    };
    export {
        uploadService
    };

子组件 user_import.vue

    <template>
        <div class="c_dialog_box">
            <div class="c_dialog">
                <header class="c_dialog_header">
                    <span>导入数据</span>
                    <i class="el-icon-close right" @click="close"></i>
                </header>
                <section class="c_dialog_center">
                    <div v-if="!flag.flag_progress">
                        <p>模板提供学生数据的导入，<a href="" download="数据模板">下载导入模板</a></p>
                        <el-button class="mt_20" type="primary" size="small" onclick="chooseSeat.click()">选择文件</el-button>
                        <input id="chooseSeat" name="files" style="display:none;" type="file" @change="onFileSelect()" accept="application/vnd.ms-excel"/>
                        <p class="mt_20" v-if="files.name">{{files.name}}</p>
                    </div>
                    <div v-show="flag.flag_progress">
                        <p>准备导入</p>
                        <progress id="uploadprogress" class="mt_20 c_dialog_import_progress" min="0" max="100" :value="progress"></progress>
                        <p class="mt_20">导入进行到：{{progress}} %</p>
                    </div>
                </section>
                <footer class="c_dialog_footer">
                    <el-button type="info" size="small" plain @click="close">取消</el-button>
                    <el-button type="primary" size="small" v-show="!flag.flag_progress" @click="J_dialog_import">开始导入</el-button>
                    <el-button type="primary" size="small" v-show="flag.flag_progress" @click="J_dialog_cancelimport">取消导入</el-button>
                </footer>
            </div>
        </div>
    </template>

像开头那篇文章，引入相对应的组件，样式等

关于axios的内容，不做过多解释直接找官网：
[github-axios](https://github.com/axios/axios)
[axios-中文文档](https://www.kancloud.cn/yunye/axios/234845)

    <script>
    import {uploadService} from 'services/upload.service';
    // import axios from 'axios';
    export default {
        data () {
            return {
                files: {},
                curGrade: {},
                flag: {
                    flag_progress: false
                },
                source: null, // 取消上传
                progress: 0
            };
        },
        methods: {
            close () {
                this.$emit('close');
            },
            onFileSelect () {
                let oFiles = document.querySelector('#chooseSeat').files;
                // 多个文件或者单个文件
                /* for (let i = 0; i < oFiles.length; i++) {
                    this.files.push(oFiles[i]);
                } */
                this.files = oFiles[0];
                console.log(this.files);
            },
            startUpload () {
                let v = this;
                let formData = new FormData();
                /* for (let i = 0; i < this.files.length; i++) {
                    let file = this.files[i];
                    formData.append('file', file);
                    // 根据需要这里可能需要作出不同的修改：formData.append(file.name, file);
                } */
                formData.append('file', v.files);
                formData.append('deptid', v.curGrade.id);
                console.log(formData);
                let cancelToken = axios.CancelToken;
                v.source = cancelToken.source();
                let config = {
                    onUploadProgress: function (progressEvent) {
                        v.progress = Math.round(ProgressEvent.loaded * 100 / ProgressEvent.total);
                    }
                };
                uploadService.uploadExcel(formData, config).then(function(r) {
                    console.log(r);
                }).catch((thrown) => {
                    if (axios.isCancel(thrown)) {
                        v.close();
                        console.log('取消上传操作成功');
                    } else {
                        console.log('取消上传操作失败');
                    }
                });
            },
            J_dialog_import () {
                this.flag.flag_progress = true;
                this.startUpload();
            },
            J_dialog_cancelimport () {
                let that = this;
                if (that.source) {
                    // 我先判断soucre是否存在，因为如果我打开弹框不作任何操作，点击取消按钮没有这一层判断的话，that.source.cancel('取消上传');会报错。
                    that.source.cancel('取消上传');
                    // "取消上传"这几个字，会在上面catch（）的error中输出的，可以console看一下。
                }
                that.flag.flag_progress = false;
            }
        }
    };
    </script>
    <style lang="scss">
        @import "src/style/c_dialog";
    </style>
