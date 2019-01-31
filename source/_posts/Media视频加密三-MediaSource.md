title: Meida视频加密三-MediaSource
date: 2018-01-02 10:31:30
categories:
- Javascript
tags:
- 视频加密
- blob
---

#### 3.MediaSource
* MediaSource是Media Source Extensions API 表示媒体资源HTMLMediaElement对象的接口。MediaSource 对象可以附着在HTMLMediaElement在客户端进行播放。
Media Source Extensions API
是Media Source Extensions API 表示媒体资源HTMLMediaElement（HTML媒体元素接口在属性和方法中添加了 HTML元素来支持基础的媒体相关的能力，就像audio和video一样。HTML 视频元素和 HTML 音频元素元素都继承自此接口）对象的接口。MediaSource对象可以附着在HTMLMediaElement在客户端进行播放。

>详细资料请查看另一篇文章 [Media Source Extensions](https://algate.gitlab.io/2018/01/04/Media%20Source%20Extensions/)
下边内容是有这篇文章中提取到的部分内容。

<!-- more -->
video.src = URL.createObjectURL(mediaSource);
URL.createObjectURL() 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
构造函数
MediaSource() 构造并且返回一个新的MediaSource的空对象（with no associated source buffers）。

MediaSource.addSourceBuffer() 创建一个带有给定MIME类型的新的 SourceBuffer 并添加到 MediaSource 的 SourceBuffers 列表。

* SourceBuffer

SourceBuffer：代表了一个经由 MediaSource 对象被传入 HTMLMediaElement 的媒体块。
MediaSource.addSourceBuffer()
sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);

SourceBuffer有许多的属性、方法、相关事件
SourceBuffer.appendBuffer()
Appends media segment data from an ArrayBuffer or ArrayBufferView object to the SourceBuffer.
ArrayBuffer或者ArrayBufferView对象追加媒体分段数据到SourceBuffer上
用法示例：sourceBuffer.appendBuffer(ArrayBuffer);

ArrayBuffer又是什么玩意呢？欢迎进入[Meida视频加密四-arraybuffer]()


> 如果遇到相关的问题，欢迎留言，如果时间允许，楼主会尽快回复！


