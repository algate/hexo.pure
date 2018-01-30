'use strict'
import '../../base/jquery.sequence-min';
import '../../base/bootstrap.min';
var a = function() {
    function a() { e.on("click", b), d.on("click", function(a) { a.stopPropagation() }) }

    function b(a) {
        var b = $(a.currentTarget).parent("li.has-submenu"),
            e = b.index();
        return 0 != b.length ? (-1 !== g && d.eq(g).removeClass("mainmenu-open"), g === e ? (b.removeClass("mainmenu-open"), g = -1) : (b.addClass("mainmenu-open"), g = e, f.off("click").on("click", c)), !1) : void 0 }

    function c(a) { d.eq(g).removeClass("mainmenu-open"), g = -1 }
    var d = $("#mainmenu > ul > li"),
        e = d.children("a"),
        f = $("body"),
        g = -1;
    return { init: a } 
}();
(function() {
    function b() {
        $("#scroll_box").stop().animate({ "margin-left": "-" + i * e + "px" }, g, function() { 
            $("#scroll_box").css("margin-left", 0);
            for (var a = 0; i > a; a++) 
            $("#scroll_box").find("li").last().after($("#scroll_box").find("li").first()) 
        }) 
    }
    var c = { 
        nextButton: !1, 
        prevButton: !1, 
        pagination: !0, 
        animateStartingFrameIn: !0, 
        autoPlay: !0, 
        autoPlayDelay: 6e3, 
        preloader: !0 
    };
    $("#sequence").sequence(c).data("sequence");
    a.init();
    var d = $("#scroll_box li").length,
        e = $("#scroll_box li").outerWidth(!0),
        f = $(".box").outerWidth(!0),
        g = (Math.ceil(f / e), 3e3),
        h = 3e4,
        i = 1;
    $("#scroll_box").css("width", d * e), setInterval(b, h) 
})();