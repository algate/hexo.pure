title: Vue中CropperJs图片裁切功能实现
date: 2018-05-16 14:01:30
categories:
- Vue
tags:
- cropperJs
- 图片裁切
---
页面html代码：

    <div>
        <el-button class="mt_10" type="primary" size="small" onclick="chooseSeat.click()">选择文件</el-button>
        <input id="chooseSeat" name="files" style="display:none;" type="file" @change="onFileSelect()" accept="image/png,image/jpeg,image/jpg"/>
        <div style="width: 480px;min-height:280px;background: #ccc;margin-top:10px;margin-bottom: 10px;">
            <div style="width: 100%;min-height:100%;background: #ccc;">
                <img id="Img_uploadImg" style="max-width: 100%;" alt="原始图">
            </div>
        </div>
        <div style="margin-bottom: 10px;">
            <img :src="Img_cropperImg" style="width:120px;height:120px;background: #ccc;" alt="裁切图">
        </div>
        <el-button type="primary" size="small" @click="J_savePortrait">保存</el-button>
        <a :href="Img_download" download="头像"></a>
    </div>
<!-- more -->
首先需要引入cropperjs;

    import Cropper from 'cropperjs';
script:

    data () {
        return {
            files: {},
            Img_cropperImg: '',
            cropper: null,
            Img_download: ''
        };
    },

选择文件方法：

    onFileSelect() {
        let v = this;
        let oFiles = document.querySelector('#chooseSeat').files;
        this.files = oFiles[0];
        let reader = new FileReader();
        reader.onload = function (e) {
            console.log(e);
            document.querySelector('#Img_uploadImg').src = e.target.result;
            let src = e.target.result;
            if (this.cropper) {
                v.cropper.destroy();
            }
            v.startCropper(src);
        };
        reader.readAsDataURL(this.files);
        // this.ImguploadImg = URL.createObjectURL(this.files); // 可以转化为blob文件
    }


<!-- startCropper--初始化裁切功能 -->

    startCropper(src) {
            let v = this;
            var image = document.getElementById('Img_uploadImg');
            this.cropper = new Cropper(image, {
                aspectRatio: 1 / 1,
                ready: function (e) {
                    console.log(e.type);
                },
                cropstart: function (e) {
                    console.log(e.type, e.detail.action);
                },
                cropmove: function (e) {
                    console.log(e.type, e.detail.action);
                },
                cropend: function (e) {
                    console.log(e.type, e.detail.action);
                },
                crop: function (e) {
                    let src = this.cropper.getCroppedCanvas({width: 120, height: 120}).toDataURL('image/png');
                    v.Img_cropperImg = src;
                    this.cropper.getCroppedCanvas({width: 120, height: 120}).toBlob((blob) => {
                        v.Img_download = blob;
                    });
                },
                zoom: function (e) {
                    console.log(e.type, e.detail.ratio);
                }
            });
        },

