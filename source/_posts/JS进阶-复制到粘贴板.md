title: 把内容复制到粘贴板
date: 2018-05-17 18:02:30
categories:
- Javascript
tags:
- 复制内容
- 粘贴板
---

需求: 点击按钮 复制 一部分不相关的文字内容 到粘贴板
// 复制到粘贴板
```javascript
    copyTextToClipboard(text) {
        var textArea = document.createElement('textarea');
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = text ? text : '';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            var msg = document.execCommand('copy') ? '成功' : '失败';
            this.$message.success('复制' + msg);
        } catch (err) {
            console.log('浏览器不支持该功能，sorry！');
        }
        document.body.removeChild(textArea);
    }
```
<!-- more -->

这是之前写页面复制到剪贴板，没有问题可以使用！

直到我写移动端，我的Android手机怎么测试都ok，而玩测试的同学一本正经的跟我说不行。bug打开关闭打开，我就纳闷了。

我找到测试的同学，想让复现一下。当同学拿出她硕大的iPhone 6/7/8/x*(不知道是什么型号)，我说不用复现了，我先回去看看。

fu*k，ie的bug时代结束了，迎来的是ios的bug！

直接上代码：
```javascript
<button id="copy" style="margin:20px;padding:8px;font-size:16px;">敢玩我</button>
<script type="text/javascript">
function copyTextToClipboard(text) {
    var textArea = document.createElement('textarea');
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = text ? text : "what's copyed?";
    document.body.appendChild(textArea);
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {//区分iPhone设备
      window.getSelection().removeAllRanges();//这段代码必须放在前面否则无效
      // var Url2=document.getElementById("biaoios");//要复制文字的节点
      var range = document.createRange();
      // 选中需要复制的节点
      range.selectNode(textArea);
      // 执行选中元素
      window.getSelection().addRange(range);
      // 执行 copy 操作
      var successful = document.execCommand('copy');
      // 移除选中的元素
      window.getSelection().removeAllRanges();
    } else {
      textArea.select();
      var msg = document.execCommand("Copy");
    }
    document.body.removeChild(textArea);
}
document.querySelector('#copy').onclick = function(){
    var str = '敢玩我？';
    copyTextToClipboard(str);
}
</script>
```
