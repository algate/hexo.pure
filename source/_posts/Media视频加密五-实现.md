title: Meida视频加密五-实现原理
date: 2018-01-02 15:31:30
categories:
- Javascript
tags:
- 视频加密
- blob
---

#### 5.实现原理

Blob() 构造函数`var aBlob = new Blob( array, options );`

XMLHttpRequest.responseType 这是XHR返回响应的类型

谁知道可以返回那些类型？

XMLHttpRequest.responseType 属性是一个枚举值，返回响应的类型。
它还允许作者将响应类型更改为一个"arraybuffer", "blob", "document", "json", 或 "text" 。如果将一个空字符串设置为responseType的值，则将其假定为类型“text”。
<!-- more -->
responseType支持以下几种值：

Value  | Data type of response property
---|---
"" | DOMString (this is the default value)
"arraybuffer"  | ArrayBuffer
"blob" | Blob
"document" | Document
"json" | JavaScript object, parsed from a JSON string returned by the server
"text" | DOMString
"moz-blob" | Used by Firefox to allow retrieving partial Blob data from progress events. This lets your progress event handler start processing data while it's still being received.
"moz-chunked-text" | Similar to "text", but is streaming. This means that the value in response is only available during dispatch of the "progress" event and only contains the data received since the last "progress" event. When response is accessed during a "progress" event it contains a string with the data. Otherwise it returns null.This mode currently only works in Firefox.
"moz-chunked-arraybuffer" | Similar to "arraybuffer", but is streaming. This means that the value in response is only available during dispatch of the "progress" event and only contains the data received since the last "progress" event.When response is accessed during a "progress" event it contains a string with the data. Otherwise it returns null.This mode currently only works in Firefox.
"ms-stream"  |   Indicates that the response is part of a streaming download. It is supported only for download requests. This mode is available only in Internet Explorer.


大家会看到
返回的数据类型里有ArrayBuffer和blob。

上代码：

##### arraybuffer
html:

    <video controls></video>
javascript:
```
var video = document.querySelector('video');
var assetURL = 'frag_bunny.mp4';
var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';

if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
    var mediaSource = new MediaSource;
    //console.log(mediaSource.readyState); // closed
    video.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener('sourceopen', sourceOpen);
} else {
    console.error('Unsupported MIME type or codec: ', mimeCodec);
}

function sourceOpen (_) {
//console.log(this.readyState); // open
var mediaSource = this;
var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
fetchAB(assetURL, function (buf) {
    console.log(buf);
        sourceBuffer.addEventListener('updateend', function (_) {
            mediaSource.endOfStream();
            video.play();
            //console.log(mediaSource.readyState); // ended
        });
        sourceBuffer.appendBuffer(buf);
    });
};

function fetchAB (url, cb) {
    var xhr = new XMLHttpRequest;
    xhr.open('get', url);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
        cb(xhr.response);
    };
    xhr.send();
};
```

##### blob
```
    window.URL = window.URL || window.webkitURL;
    var assetURL = '../yingyong_720p.mp4';
    var assetURL_2 = '../yingyong_720p_2.mp4';
    var assetURL2 = '../frag_bunny.mp4';
    var assetURL3 = '../teacher.mp4';
    var assetURLnew = '../HTML5_history.mp4';
    var xhr = new XMLHttpRequest;
    xhr.open('get', assetURLnew, true);

    xhr.responseType = 'blob';

    xhr.onload = function(){
        console.log(this);
        if(this.status == 200 && this.readyState == 4){
            var blob = this.response;
            console.log(blob);
            var reader = new FileReader();
            reader.readAsArrayBuffer(blob);
            // reader.readAsBinaryString(blob);
            // reader.readAsDataURL(blob);
            // reader.readAsText(blob);
            reader.addEventListener("loadend", function() {
                // reader.result 包含转化为类型数组的blob
                console.log(reader);
                var arrayBuffer = reader.result;
                var dataView = new DataView(arrayBuffer);
                // 字符串的编码方法是确定的
                console.log(dataView);
                // 回归到了二进制语言，解析计算机语言 1 和 0 。只要你肯花功夫，我觉得你会成功的。
                // var abc16str = String.fromCharCode.apply(null, new Uint16Array(dataView));
            });
            video.onload = function(e){
                window.URL.revokeObjectURL(video.src);
            }
            video.src =window.URL.createObjectURL(blob);
        }
    }
    xhr.send();
```
> 如果遇到相关的问题，欢迎留言，如果时间允许，楼主会尽快回复！


