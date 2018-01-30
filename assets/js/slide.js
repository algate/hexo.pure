$(function(){
        //Carousel
        // var carousel=new Carousel($(".J_Poster").eq(0));
        Carousel.init($(".J_Poster"));
    });
    (function($){
        var Carousel=function(poster){
            var self=this;
            // console.log(poster.attr("data-setting"));
            //保存单个旋转木马对象
            this.poster=poster;
            this.posterItemMain=poster.find("ul.poster-list");
            this.prevBtn=poster.find("div.poster-prev-btn");
            this.nextBtn=poster.find("div.poster-next-btn");
            this.posterItems=poster.find('li.poster-item');
            if(this.posterItems.size()%2==0){
                this.posterItemMain.append(this.posterItems.eq(0).clone());
                this.posterItems=this.posterItemMain.children();
            }

            this.posterFirstItem=this.posterItems.first();
            this.posterLastItem=this.posterItems.last();
            this.rotateFlag=true;

            //默认配置参数
            this.setting={
                "width":1000,//幻灯片的宽度
                "height":360,//幻灯片的高度
                "posterWidth":640,//幻灯片第一张的宽度
                "posterHeight":360,//幻灯片第一张的高度
                "verticalAlign":"middle",
                "scale":0.8,
                "speed":1000
            }
            $.extend(this.setting,this.getSetting());
            // console.log(this.getSetting());
            //设置配置参数值
            this.setSettingValue();
            this.setPosterPos();

            this.nextBtn.click(function(){
                if(self.rotateFlag){
                    self.rotateFlag=false;
                    self.carouseRotate("left");
                }
            });
            this.prevBtn.click(function(){
                if(self.rotateFlag){
                    self.rotateFlag=false;
                    self.carouseRotate("right");
                }
            });
            //是否自动播放
            if(this.setting.autoPlay){
                this.autoPlay();
                this.poster.hover(function(){
                    window.clearInterval(self.timer);
                },function(){
                    self.autoPlay();
                })
            }
        };
        Carousel.prototype={
            autoPlay:function(){
                var self=this;
                this.timer=window.setInterval(function(){
                    self.nextBtn.click();
                },this.setting.delay);
            },
            //旋转
            carouseRotate:function(dir){
                var _this=this;
                var zIndexArr=[];
                if(dir=="left"){
                    this.posterItems.each(function(){
                        var self=$(this);
                        var prev=self.prev().get(0)?self.prev():_this.posterLastItem;
                        var width=prev.width();
                        var height=prev.height();
                        var zIndex=prev.css("zIndex");
                        var opacity=prev.css("opacity");
                        var left=prev.css("left");
                        var top=prev.css("top");
                        zIndexArr.push(zIndex);
                        self.animate({
                            width:width,
                            height:height,
                            // zIndex:zIndex,
                            opacity:opacity,
                            left:left,
                            top:top
                            },function(){
                                _this.rotateFlag=true;
                            }
                        );
                    });
                    this.posterItems.each(function(i){
                        $(this).css("zIndex",zIndexArr[i]);
                    });
                }else if(dir=="right"){
                    this.posterItems.each(function(){
                        var self=$(this);
                        var next=self.next().get(0)?self.next():_this.posterFirstItem;
                        var width=next.width();
                        var height=next.height();
                        var zIndex=next.css("zIndex");
                        var opacity=next.css("opacity");
                        var left=next.css("left");
                        var top=next.css("top");
                        zIndexArr.push(zIndex);
                        self.animate({
                            width:width,
                            height:height,
                            // zIndex:zIndex,
                            opacity:opacity,
                            left:left,
                            top:top
                            },function(){
                                _this.rotateFlag=true;
                            }
                        );
                    });
                    this.posterItems.each(function(i){
                        $(this).css("zIndex",zIndexArr[i]);
                    });
                }
            },
            //设置剩余的侦的位置关系
            setPosterPos:function(){
                var self=this;
                var sliceItems=this.posterItems.slice(1),
                    sliceSize=sliceItems.size()/2,
                    rightSlice=sliceItems.slice(0,sliceSize);
                    level=Math.floor(this.posterItems.size()/2),
                    leftSlice=sliceItems.slice(sliceSize);
                //设置右边帧的位置关系和宽度高度top
                var rw=this.setting.posterWidth,
                    rh=this.setting.posterHeight,
                    gap=((this.setting.width-this.setting.posterWidth)/2)/level;
                var firstLeft=(this.setting.width-this.setting.posterWidth)/2;
                var fixOffsetLeft=firstLeft+rw;

                rightSlice.each(function(i){
                    level--;
                    rw=rw*self.setting.scale;
                    rh=rh*self.setting.scale;
                    var j=i;
                    $(this).css({
                        zIndex:level,
                        width:rw,
                        height:rh,
                        opacity:1/(++j),
                        left:fixOffsetLeft+(++i)*gap-rw,
                        // top:(self.setting.height-rh)/2,
                        top:self.setVerticalAlign(rh),
                    });
                })
                var lw=rightSlice.last().width();
                var lh=rightSlice.last().height();
                var oloop=Math.floor(this.posterItems.size()/2);
                leftSlice.each(function(i){
                    $(this).css({
                        zIndex:i,
                        width:lw,
                        height:lh,
                        opacity:1/oloop,
                        left:i*gap,
                        // top:(self.setting.height-lh)/2,
                        top:self.setVerticalAlign(lh),
                    });
                    lw=lw/self.setting.scale;
                    lh=lh/self.setting.scale;
                    oloop--;
                })

            },
            setVerticalAlign:function(height){
                var verticalType=this.setting.verticalAlign,
                    top=0;
                if(verticalType=="middle"){
                    top=(this.setting.height-height)/2;
                }else if(verticalType=="top"){
                    top=0;
                }else if(verticalType=="bottom"){
                    top=this.setting.height-height;
                }else{
                    top=(this.setting.height-height)/2;
                };
                return top;
            },
            //设置配置参数数值去控制基本的宽度高度
            setSettingValue:function(){
                this.poster.css({
                    width:this.setting.width,
                    height:this.setting.height,
                });
                this.posterItemMain.css({
                    width:this.setting.width,
                    height:this.setting.height,
                });
                var w=(this.setting.width-this.setting.posterWidth)/2;
                this.nextBtn.css({
                    width:w,
                    heigth:this.setting.height,
                    zIndex:Math.ceil(this.posterItems.size()/2),
                });
                this.prevBtn.css({
                    width:w,
                    height:this.setting.height,
                    zIndex:Math.ceil(this.posterItems.size()/2),
                });
                this.posterFirstItem.css({
                    width:this.setting.posterWidth,
                    height:this.setting.posterHeight,
                    left:w,
                    zIndex:Math.floor(this.posterItems.size()/2),
                })
            },

            //获取人工配置参数
            getSetting:function(){
                var setting=this.poster.attr("data-setting");
                if(setting&&setting!=""){
                    return $.parseJSON(setting);
                }else{
                    return {};
                }
            }
        };
        Carousel.init=function(posters){
            var _this=this;
            posters.each(function(){
                new _this($(this));
            });
        };
        window["Carousel"]=Carousel;
    })(jQuery);