// build time:Wed Feb 27 2019 11:55:34 GMT+0800 (GMT+08:00)
(function(t){var i=t("#sidebar").height()-t(window).height()+60;t(".article-entry").each(function(i){t(this).find("img").filter(function(i){return t(this).hasClass("")}).each(function(){if(this.alt&&!(!!t.prototype.justifiedGallery&&t(this).parent(".justified-gallery").length)){t(this).after('<span class="caption">'+this.alt+"</span>")}if(t(this).parent().prop("tagName")!=="A"){t(this).wrap('<a href="'+(t(this).attr("data-imgbig")?t(this).attr("data-imgbig"):this.src)+'" title="'+this.alt+'" class="gallery-item"></a>')}})});if(typeof lightGallery!="undefined"){var e={selector:".gallery-item"};t(".article-entry").each(function(t,i){lightGallery(i,e)});lightGallery(t(".article-gallery")[0],e)}if(!!t.prototype.justifiedGallery){var e={rowHeight:140,margins:4,lastRow:"justify"};t(".justified-gallery").justifiedGallery(e)}t(document).on("click",function(){t("#profile").removeClass("card")}).on("click","#profile-anchor",function(i){i.stopPropagation();t("#profile").toggleClass("card")}).on("click",".profile-inner",function(t){t.stopPropagation()});if(t("#sidebar").length){t(document).on("scroll",function(){if(t(document).width()>=800){if(t(this).scrollTop()>i&&t(this).scrollTop()>0){t("#toTop").fadeIn();t("#toTop").css("left",t("#sidebar").offset().left)}else{t("#toTop").fadeOut()}}else{t("#toTop").fadeIn();t("#toTop").css("right",20)}}).on("click","#toTop",function(){t("body, html").animate({scrollTop:0},600)})}})(jQuery);
//rebuild by neat 