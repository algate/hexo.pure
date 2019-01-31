title: Media Source Extensions
date: 2018-01-04 17:31:30
categories:
- Javascript
tags:
- MSE
---
### Media Source Extensions API

#### 1. 前言

媒体源扩展 API（MSE） 提供了实现无插件且基于 Web 的流媒体的功能。使用 MSE，媒体串流能够通过 JavaScript 创建，并且能通过使用 `<audio>` 和 `<video>` 元素进行播放。
<!-- more -->
我们已经可以在 Web 应用程序上无插件地播放视频和音频了。但是，现有架构过于简单，只能满足一次播放整个曲目的需要，无法实现拆分/合并数个缓冲文件。流媒体直到现在还在使用 Flash 进行服务，以及通过 RTMP 协议进行视频串流的 Flash 媒体服务器。

MSE 使我们可以把通常的单个媒体文件的 src 值替换成引用 MediaSource 对象（一个包含即将播放的媒体文件的准备状态等信息的容器），以及引用多个 SourceBuffer 对象（代表多个组成整个串流的不同媒体块）的元素。MSE 让我们能够根据内容获取的大小和频率，或是内存占用详情（例如什么时候缓存被回收），进行更加精准地控制。 它是基于它可扩展的 API 建立自适应比特率流客户端（例如DASH 或 HLS 的客户端）的基础。

在现代浏览器中创造能兼容 MSE 的媒体（assets）非常费时费力，还要消耗大量计算机资源和能源。此外，还须使用外部实用程序将内容转换成合适的格式。虽然浏览器支持兼容 MSE 的各种媒体容器，但采用 H.264 视频编码、AAC 音频编码和 MP4 容器的格式是非常常见的，且一定兼容。MSE 同时还提供了一个 API，用于运行时检测容器和编解码是否受支持。

#### 2. 媒体源扩展接口

  MediaSource
      代表了将由 HTMLMediaElement 对象播放的媒体资源。

  SourceBuffer
      代表了一个经由 MediaSource 对象被传入 HTMLMediaElement 的媒体块。

  SourceBufferList
      列出多个 SourceBuffer 对象的简单的容器列表。

  VideoPlaybackQuality
      包含了有关正被 `<video>` 元素播放的视频的质量信息，例如被丢弃或损坏的帧的数量。由 HTMLVideoElement.getVideoPlaybackQuality() 方法返回。

  TrackDefault
      为在媒体块的初始化段（initialization segments）中没有包含类型、标签和语言信息的轨道，提供一个包含这些信息的 SourceBuffer。

  TrackDefaultList
      列出多个 TrackDefault 对象的简单的容器列表。

  >其他接口的扩展
  URL.createObjectURL()
      创建一个指向一个 MediaSource 对象的 URL。要求此 URL 可以被指定为一个用来播放媒体流的 HTML 媒体元素的 src 的值。
  HTMLMediaElement.seekable
      当一个 MediaSource 对象被 HTML 媒体元素播放时，此属性将返回一个包含用户能够在什么时间范围内进行调整的对象 TimeRanges。
  HTMLVideoElement.getVideoPlaybackQuality()
      针对正在播放的视频，返回一个 VideoPlaybackQuality 对象。
  AudioTrack.sourceBuffer, VideoTrack.sourceBuffer, TextTrack.sourceBuffer
      返回创建了相关轨道的 SourceBuffer。

##### 2-1.MediaSource
  是Media Source Extensions API 表示媒体资源HTMLMediaElement（HTML媒体元素接口在属性和方法中添加了 HTML元素来支持基础的媒体相关的能力，就像audio和video一样。HTML 视频元素和 HTML 音频元素元素都继承自此接口）对象的接口。MediaSource对象可以附着在HTMLMediaElement在客户端进行播放。

  ** 属性：（从父接口EventTarget上继承而来）**

* MediaSource.sourceBuffers `只读`
    返回一个SourceBufferList 对象，包含了这个MediaSource的SourceBuffer的对象列表。

* MediaSource.activeSourceBuffers `只读`
    Returns a SourceBufferList object containing a subset of the SourceBuffer objects contained within SourceBuffers — the list of objects providing the selected video track,  enabled audio tracks, and shown/hidden text tracks.

* MediaSource.readyState `只读`
    返回一个包含当前MediaSource状态的集合，即使它当前没有附着到一个media元素(closed)，或者已附着并准备接收SourceBuffer 对象 (open)，亦或者已附着但这个流已被MediaSource.endOfStream()关闭(ended.)

* MediaSource.duration
    Gets and sets the duration of the current media being presented.

** 方法 ** (Inherits properties from its parent interface, EventTarget)

* MediaSource.addSourceBuffer()
    创建一个带有给定MIME类型的新的 SourceBuffer 并添加到 MediaSource 的 SourceBuffers 列表。
    `(SourceBuffer[MediaSource.addSourceBuffer()返回的] 和 SourceBuffers[MediaSource的属性(SourceBuffersList对象)] 是两个不同的概念)`

* MediaSource.removeSourceBuffer()
    删除指定的SourceBuffer 从这个MediaSource对象中的 SourceBuffers列表。

* MediaSource.endOfStream()
    Signals the end of the stream.

  静态方法

* MediaSource.isTypeSupported()
    返回一个 Boolean 值表明给定的MIME类型是否被当前的浏览器——这意味着可以成功的创建这个MIME类型的SourceBuffer 对象。


##### 2-2.SourceBuffer
SourceBuffer 代表一个经由 MediaSource 对象被传入 HTMLMediaElement 的可播放媒体块。
** Properties **
* SourceBuffer.mode
    Controls how the order of media segments in the SourceBuffer is handled, in terms of whether they can be appended in any order, or they have to be kept in a strict sequence.

* SourceBuffer.updating `只读`
    是否SourceBuffer目前正在更新，SourceBuffer.appendBuffer(),SourceBuffer.appendStream(),或SourceBuffer.remove()操作目前正在进度。

* SourceBuffer.buffered `只读`
    返回目前SourceBuffer缓冲的时间范围。


* SourceBuffer.timestampOffset
    Controls the offset applied to timestamps inside media segments that are subsequently appended to the SourceBuffer.

* SourceBuffer.audioTracks `只读`
    当前SourceBuffer包含的音轨列表.

* SourceBuffer.videoTracks `只读`
    当前SourceBuffer包含的视频跟踪列表.

* SourceBuffer.textTracks `只读`
    当前SourceBuffer包含的文本跟踪列表.

* SourceBuffer.appendWindowStart
    控制添加窗口开始的时间戳.这时间戳范围,可用于将过滤媒体数据附加到SourceBuffer上.在这个时间戳范围的媒体编码帧会被附加到SourceBuffer上，不在时间戳范围的不会被附加。

* SourceBuffer.appendWindowEnd
    控制添加窗口结束的时间戳

* SourceBuffer.trackDefaults
    Specifies the default values to use if kind, label, and/or language information is not available in the initialization segment of the media to be appended to the SourceBuffer.

** Event handlers **

* SourceBuffer.onabort
    Fired whenever SourceBuffer.appendBuffer() or SourceBuffer.appendStream() is ended by a call to SourceBuffer.abort(). SourceBuffer.updating changes from true to false.

* SourceBuffer.onerror
    Fired whenever an error occurs during SourceBuffer.appendBuffer() or SourceBuffer.appendStream(). SourceBuffer.updating changes from true to false.

* SourceBuffer.onupdate
    Fired whenever SourceBuffer.appendBuffer() method or the SourceBuffer.remove() completes. SourceBuffer.updating changes from true to false. This event is fired before onupdateend.

* SourceBuffer.onupdateend
    Fired whenever SourceBuffer.appendBuffer() method or the SourceBuffer.remove() has ended. This event is fired after onupdate.

* SourceBuffer.onupdatestart
    Fired whenever the value of SourceBuffer.updating transitions from false to true.

** Methods **

Inherits methods from its parent interface, EventTarget.

SourceBuffer.appendBuffer()
    Appends media segment data from an ArrayBuffer or ArrayBufferView object to the SourceBuffer.
SourceBuffer.appendStream()
    Appends media segment data from a ReadableStream object to the SourceBuffer.
SourceBuffer.abort()
    Aborts the current segment and resets the segment parser.
SourceBuffer.remove()
    Removes media segments within a specific time range from the SourceBuffer.
