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
<!-- more -->
