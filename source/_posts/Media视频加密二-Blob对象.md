title: Meida视频加密二-Blob对象
date: 2018-01-02 09:31:30
categories:
- Javascript
tags:
- 视频加密
- blob
---

#### 2. blob
```
<video src="blob:http://www.bilibili.com/d0823f0f-2b2a-4fd6-a93a-e4c82173c107"></video>
```
* ** a.什么是blob？ **

Blob 对象表示一个不可变、原始数据的类文件对象。Blob 表示的不一定是JavaScript原生格式的数据。 文件(即File)接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。

要从其他非blob对象和数据构造一个Blob，请使用 Blob() 构造函数。要创建包含另一个blob数据的子集blob，请使用 slice()方法。要获取用户文件系统上的文件对应的Blob对象，
<!-- more -->
>File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的 context 中。比如说， FileReader, URL.createObjectURL(), createImageBitmap(), 及 XMLHttpRequest.send() 都能处理 Blob  和 File。

官方：接受Blob对象的API也被列在 File 文档中(下边有file相关内容的部分，继续浏览)。

[MDN-Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)

Blob属性：

    Blob.size 只读
        Blob 对象中所包含数据的大小（单位为字节）。
    Blob.type 只读
        一个字符串，表明该Blob对象所包含数据的MIME类型。如果类型无法确定，则返回空字符串。
        语法：`var mimetype = instanceOfFile.type`
* ** b.如何创建Blob **

  > BlobBuilder 接口提供了另外一种创建Blob对象的方式:使用旧方法创建 Blob 对象。[链接地址](https://developer.mozilla.org/zh-CN/docs/Web/API/BlobBuilder)
  解释：使用 BlobBuilder 来创建一个Blob 实例，并且使用一个 append() 方法，将字符串（或者 ArrayBuffer 或者 Blob，此处用 string 举例）插入，一旦数据插入成功，就可以使用 getBlob() 方法设置一个 mime 。但该方式现在已经废弃，不应继续使用：
    ```
    var builder = new BlobBuilder();
    var fileParts = ['<a id="a"><b id="b">hey!</b></a>'];
    builder.append(fileParts[0]);
    var myBlob = builder.getBlob('text/xml');
    ```

** Blob构造函数 **

  Blob() 构造函数返回一个新的 Blob 对象。 blob的内容由参数数组中给出的值的串联组成。

  Blob() 构造函数 允许用其它对象创建 Blob 对象。比如，用字符串构建一个 blob：

语法： `var aBlob = new Blob( array, options );`

参数：
  * array 是一个由ArrayBuffer, ArrayBufferView(TypedArray类型化数组的构造函数), Blob, DOMString 等对象构成的 Array，或者其他类似对象的混合体，它将会被放进Blob。DOMStrings会被编码为UTF-8。
    * ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。ArrayBuffer 不能直接操作，而是要通过类型数组对象或 DataView 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。
      * ArrayBuffer 构造函数用来创建一个指定字节长度的 ArrayBuffer 对象。
        * 以现有数据获取 ArrayBuffer
        ```
        function b64EncodeUnicode(str) {
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
        }
        b64EncodeUnicode('✓ à la mode'); // "4pyTIMOgIGxhIG1vZGU="
        ```
        * FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。
          其中File对象可以是来自用户在一个 `<input>` 元素上选择文件后返回的FileList对象,也可以来自拖放操作生成的 DataTransfer对象,还可以是来自在一个HTMLCanvasElement上执行mozGetAsFile()方法后返回结果。

  * options 是一个可选的BlobPropertyBag字典，它可能会指定如下两个属性：

        type，默认值为 ""，它代表了将会被放入到blob中的数组内容的MIME类型。
        endings，默认值为"transparent"，用于指定包含行结束符\n的字符串如何被写入。 它是以下两个值中的一个： "native"，代表行结束符会被更改为适合宿主操作系统文件系统的换行符，或者 "transparent"，代表会保持blob中保存的结束符不变

```
  var aFileParts = ['<a id="a"><b id="b">hey!</b></a>']; // 一个包含DOMString的数组
  var oMyBlob = new Blob(aFileParts, {type : 'text/html'}); // 得到 blob

  var debug = {hello: "world"};
  var blob = new Blob([JSON.stringify(debug, null, 2)], {type: 'application/json'});
```

#### File

通常情况下， File 对象是来自用户在一个 `<input>` 元素上选择文件后返回的 FileList 对象,也可以是来自由拖放操作生成的 DataTransfer 对象，或者来自 HTMLCanvasElement 上的 mozGetAsFile() API。

File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的 context 中。比如说， FileReader, URL.createObjectURL(), createImageBitmap(), 及 XMLHttpRequest.send() 都能处理 Blob  和 File。

* ** URL.createObjectURL() **
使用 Blob 创建一个指向类型化数组的URL

```
var blob = new Blob([typedArray], {type: "application/octet-binary"});// 传入一个合适的MIME类型
var url = URL.createObjectURL(blob);
// 会产生一个类似blob:d3958f5c-0777-0845-9dcf-2cb28783acaf 这样的URL字符串
// 你可以像使用一个普通URL那样使用它，比如用在img.src上。（MSE）


```
从 Blob 中提取数据
>从Blob中读取内容的唯一方法是使用 FileReader。以下代码将 Blob 的内容作为类型数组读取：

```
var reader = new FileReader();
// onabort、onerror、onload、onloadstart、onloadend、onprogress
reader.addEventListener("loadend", function() {
   // reader.result 包含转化为类型数组的blob
   // 文件的内容。该属性仅在读取操作完成后才有效，数据的格式取决于使用哪个方法来启动读取操作。
});
reader.readAsArrayBuffer(blob);
```
简单说下 FileReader：
属性：

  * FileReader.error 只读
      一个DOMException，表示在读取文件时发生的错误 。
  * FileReader.readyState 只读
      表示FileReader状态的数字。取值如下：

常量名 | 值 |  描述
---|---|---
EMPTY  | 0 |  还没有加载任何数据
LOADING  | 1  | 数据正在被加载
DONE | 2 |  已完成全部的读取请求

  * FileReader.result 只读
      文件的内容。该属性仅在读取操作完成后才有效，数据的格式取决于使用哪个方法来启动读取操作。
方法：

      FileReader.abort()
          中止读取操作。在返回时，readyState属性为DONE。
      FileReader.readAsArrayBuffer()
          开始读取指定的 Blob中的内容, 一旦完成, result 属性中保存的将是被读取文件的 ArrayBuffer 数据对象.
      FileReader.readAsBinaryString()
          开始读取指定的Blob中的内容。一旦完成，result属性中将包含所读取文件的原始二进制数据。
      FileReader.readAsDataURL()
          开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容。
      FileReader.readAsText()
          开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个字符串以表示所读取的文件内容。

参考文献：
{% blockquote %}
  http://blog.csdn.net/oscar999/article/details/36373183/
{% endblockquote %}
找到个比较通俗易懂的网址：[Blob对象](https://www.cnblogs.com/hhhyaaon/p/5928152.html)

> 如果遇到相关的问题，欢迎留言，如果时间允许，楼主会尽快回复！


