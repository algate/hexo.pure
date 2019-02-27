title: Video自定义组件controls的实现
date: 2018-02-02 17:31:30
categories:
- Javascript插件
tags:
- video
- controls
---
项目参考地址 [video-contral-rewrite](https://github.com/algate/video-contral-rewrite)
效果如下：
![](/hexo.pure/images/posts/video/01.png)![](/hexo.pure/images/posts/video/02.png)
<!-- more -->
##### html
```
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title>Custom HTML5 Video Player</title>
    <link rel="stylesheet" type="text/css" href="normalize.css">
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="stylesheet" type="text/css" href="iconfont.css">
</head>

<body>
    <div id="container" style="position: relative;background: #000; z-index: 0;overflow: hidden;font-size:0;" tabindex="0">
        <div id="video_container">
            <video preload poster="" style="width:100%;">
                <!-- <source src="http://nettuts.s3.amazonaws.com/763_sammyJSIntro/trailer_test.mp4" type="video/mp4"> -->
                <source src="/yingyong_720p.mp4" type="video/mp4">
            </video>
        </div>
        <div id="videoControls" class="player_control_bar skin_0 show">
            <div id="play" class="player_control_bar_toggle player_control_bar_iconfont"></div>
            <div id="progressText" style="font-size: 14px;line-height: 40px;color:#fff;float:left;">00:00</div>
            <div id="progress" class="player_control_bar_progress">
                <div id="play_progress" class="player_control_bar_progress_played"></div>
                <div id="buffer_progress" class="player_control_bar_progress_buffer">
                    <!-- <span></span> -->
                </div>
                <div id="progress_box" class="player_control_bar_click player_control_bar_candrag"></div>
            </div>
            <div id="progress_line" class="player_control_bar_hint">
                <div class="player_control_bar_picture"></div>
                <div id="progress_line_time" class="player_control_bar_hover_time">01:01</div>
            </div>
            <div class="audio-line">
                <div class="audio-line-head player_control_bar_iconfont"></div>
                <span class="audio-line-bar"><span class="audio-line-bar-volume"></span></span>
            </div>
            <div id="fullScreen" title="FullScreen Toggle" class="player_control_bar_fullscreen player_control_bar_iconfont"></div>
            <!-- http://videojj.com -->
            <a href="javascript:;" class="player_control_bar_logo" target="_blank" style="color:#fff;font-size:24px;"><i class="icon-youtube2"></i></a>
        </div>
    </div>
</body>
<script type="text/javascript" src="js/videoplayer.js"></script>
</html>
```
##### css

iconfont.css 为字体文件样式
style.css 为自定义播放器控制条样式

##### js

```
    var video = document.getElementsByTagName('video')[0],
        videoContainer = document.getElementById('video_container'),
        videoControls = document.getElementById('videoControls'),
        play = document.getElementById('play'),
        progressContainer = document.getElementById("progress"),
        progressHolder = document.getElementById("progress_box"),
        playProgressBar = document.getElementById("play_progress"),
        progressLine = document.getElementById("progress_line"),
        progressLineTime = document.getElementById("progress_line_time"),
        progressText = document.getElementById('progressText'),
        bufferProgress = document.getElementById('buffer_progress'),
        fullScreenToggleButton = document.getElementById("fullScreen"),
        // Boolean that allows us to "remember" the current size of the video player.
        isVideoFullScreen = false,
        playProgressInterval = null,
        currentLineTime;
```
```
var videoPlayer = {
        init : function() {
            // this is equal to the videoPlayer object.
            var that = this;
            this.addSource();
            // Helpful CSS trigger for JS.
            document.documentElement.className = 'js';
            // Get rid of the default controls, because we'll use our own.
            video.removeAttribute('controls');
            // When meta data is ready, show the controls
            <!-- video.addEventListener('loadeddata', this.initializeControls, false); -->
            // 当浏览器正在下载指定的音频/视频时，会发生 progress 事件。
            video.addEventListener('progress',this.videoBufferedProgress, false);
            // When play, pause buttons are pressed.
            // 当浏览器能够开始播放指定的音频/视频时，发生 canplay 事件
            video.addEventListener('canplay',function(){
                if(video.readyState == 4){
                    bufferProgress.style.width = "100%";
                } else {
                    var curWidth = Number(bufferProgress.style.width.replace('%',''));
                    (function addWidth(){
                        bufferProgress.style.width = (curWidth) + (i++) + "%";
                        if(Number(bufferProgress.style.width.replace('%','')) >= 100){
                            bufferProgress.style.width = "100%";
                            clearTimeout(allbufferProgressInterval);
                        }else{
                            var allbufferProgressInterval = setTimeout(addWidth, 50);
                        }
                    })(i=1);
                }
            },false);
            this.handleButtonPresses();
            // When the full screen button is pressed...
            fullScreenToggleButton.addEventListener("click", function(){
                isVideoFullScreen ? that.fullScreenOff() : that.fullScreenOn();
            }, true);
            this.videoScrubbing();
        },
        videoBufferedProgress: function(){
            if(video.buffered.length){
                var bufferPercent = video.buffered.end(0)/video.duration * 100;
                bufferProgress.style.width = bufferPercent + '%';
            }
        },
        handleButtonPresses : function() {
            video.addEventListener('click', this.playPause, false);
            play.addEventListener('click', this.playPause, false);
            video.addEventListener('play', function() {
                play.title = 'Pause';
                play.innerHTML = '';
                // Begin tracking video's progress.
                videoPlayer.trackPlayProgress();
            }, false);
            video.addEventListener('pause', function() {
                play.title = 'Play';
                play.innerHTML = '';
                videoPlayer.stopTrackingPlayProgress();
            }, false);
            video.addEventListener('ended', function() {
                this.currentTime = 0; this.pause();
            }, false);
        },
        playPause: function() {
            if ( video.paused || video.ended ) {
                if ( video.ended ) {
                    video.currentTime = 0;
                }
                video.play();
            } else {
                video.pause();
            }
        },
        fullScreenOn : function() {
            isVideoFullScreen = true;
            video.style.cssText = 'background:#000;position: fixed; width:' + window.innerWidth + 'px; height: ' + window.innerHeight + 'px;';
            video.className = 'fullsizeVideo';
            videoControls.style.cssText = 'position: fixed;';
            fullScreenToggleButton.classList.add("fs-active");
            fullScreenToggleButton.innerHTML = '';
            console.log(fullScreenToggleButton.classList);
            console.log('full');
            document.addEventListener('keydown', this.checkKeyCode, false);
        },
        fullScreenOff : function() {
            isVideoFullScreen = false;
            video.style.position = 'static';
            fullScreenToggleButton.classList.remove("fs-active");
            fullScreenToggleButton.innerHTML = '';
            console.log('unfull')
            video.style.cssText = '';
            videoControls.style.cssText = '';
        },
        checkKeyCode : function( e ) {
            e = e || window.event;
            if ( (e.keyCode || e.which) === 27 )
                videoPlayer.fullScreenOff();
        },
        // Every 50 milliseconds, update the play progress.
        trackPlayProgress : function(){
            (function progressTrack() {
                videoPlayer.updatePlayProgress();
                playProgressInterval = setTimeout(progressTrack, 50);
            })();
        },
        updatePlayProgress : function(){
            playProgressBar.style.width = ( (video.currentTime / video.duration) * (progressHolder.offsetWidth) ) + "px";
            progressText.innerHTML = videoPlayer.formatTime(video.currentTime).time2;
        },
        stopTrackingPlayProgress : function(){
            clearTimeout( playProgressInterval );
        },
        videoScrubbing : function() {
            progressHolder.addEventListener('mouseenter', function(){
                progressLine.style.display = 'block';
                document.onmousemove = function(e) {
                    videoPlayer.setPlayProgress( e.pageX );
                }
            },false);
            progressHolder.addEventListener('mouseleave', function(e){
                progressLine.style.display = 'none';
                document.onmousemove = null;
            },true);
            progressHolder.addEventListener('click',function(e){
                video.currentTime = currentLineTime;
                videoPlayer.updatePlayProgress();
                video.play();
            })
        },
        setPlayProgress : function( clickX ) {
            progressLine.style.left = clickX - progressLine.offsetWidth/2 - videoControls.offsetLeft + 'px';
            var newPercent = (progressLine.offsetLeft - progressContainer.offsetLeft + progressLine.offsetWidth/2)/progressContainer.offsetWidth;
            currentLineTime = video.duration * newPercent;
            progressLineTime.innerHTML = videoPlayer.formatTime(currentLineTime).time2;
        }
        // formatTime 格式化时间代码
    };
    videoPlayer.init();
```

