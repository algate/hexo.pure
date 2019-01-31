title: Meida视频加密四-ArrayBuffer
date: 2018-01-02 12:31:30
categories:
- Javascript
tags:
- 视频加密
- blob
---

#### 4.ArrayBuffer

Blob() 构造函数`var aBlob = new Blob( array, options );`

>* array 是一个由ArrayBuffer, ArrayBufferView(TypedArray类型化数组的构造函数), Blob, DOMString 等对象构成的 Array，或者其他类似对象的混合体，它将会被放进Blob。DOMStrings会被编码为UTF-8。
* ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。ArrayBuffer 不能直接操作，而是要通过类型数组对象或 DataView 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。

ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。ArrayBuffer 不能直接操作，而是要通过类型数组对象或 DataView 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。
<!-- more -->
以现有数据获取ArrayBuffer
* 从 Base64 字符串
    （一组相似的二进制到文本的编码规则，使得二进制数据在解释成radix-64的表现形式后能够用ASCII字符串的格式表示出来。Base64 这个词出自一种MIME数据传输编码。  ）
* 从file文件(File)

看到现在是不是凌乱了。我看了三遍！三遍！三遍！


那就梳理下：（在文章中找相对应的内容）
· ArrayBuffer对象
· sourceBuffer.appendBuffer(ArrayBuffer);
· sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
· var mediaSource = new MediaSource();
     MediaSource() 构造并且返回一个新的MediaSource的空对象（with no associated source buffers）
· video.src = URL.createObjectURL(mediaSource);

So，我们有了ArrayBuffer对象就ok了！

接下来就是实现了：[Media视频加密五-实现]()


> 如果遇到相关的问题，欢迎留言，如果时间允许，楼主会尽快回复！


