$(document).on('ready', function() {
    $('#bgmusic_toggle').on('click', function() {
        if ($(this).hasClass('music-toggle_on')) {
            $(this).removeClass('music-toggle_on');
            $(this).addClass('music-toggle_off');
            document.getElementById('bgmusic').pause();
        } else {
            $(this).removeClass('music-toggle_off');
            $(this).addClass('music-toggle_on');
            document.getElementById('bgmusic').play();
        }
    });
    document.getElementById('bgmusic').play();
    //必须在微信Weixin JSAPI的WeixinJSBridgeReady才能生效
    document.addEventListener("WeixinJSBridgeReady", function() {
        document.getElementById('bgmusic').play();
    }, false);
});

wx.ready(function() {
    wx.hideMenuItems({
        menuList: [
                // "menuItem:share:appMessage",
                // "menuItem:share:timeline",
                "menuItem:share:qq",
                "menuItem:share:weiboApp",
                // "menuItem:favorite",
                "menuItem:share:facebook",
                "menuItem:editTag",
                "menuItem:delete",
                "menuItem:copyUrl",
                "menuItem:originPage",
                "menuItem:readMode",
                "menuItem:openWithQQBrowser",
                "menuItem:openWithSafari",
                "menuItem:share:email",
                "menuItem:share:brand"
            ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
    });
    wx.showMenuItems({
        menuList: [
                "menuItem:share:appMessage",
                "menuItem:share:timeline",
                // "menuItem:share:qq",
                // "menuItem:share:weiboApp",
                "menuItem:favorite"
                // "menuItem:share:facebook",
                // "menuItem:editTag",
                // "menuItem:delete",
                // "menuItem:copyUrl",
                // "menuItem:originPage",
                // "menuItem:readMode",
                // "menuItem:openWithQQBrowser",
                // "menuItem:openWithSafari",
                // "menuItem:share:email",
                // "menuItem:share:brand"
            ] // 要显示的菜单项，所有menu项见附录3
    });
    wx.onMenuShareTimeline({
        title: '您收到了一份节日祝福',
        link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx81d075add9f24883&redirect_uri=http%3a%2f%2fwww.xu1s.com&response_type=code&scope=snsapi_userinfo&state=ENTER#wechat_redirect',
        imgUrl: "http://7xiqx7.com1.z0.glb.clouddn.com/head.jpg",
        success: function() {},
        cancel: function() {}
    });
    wx.onMenuShareAppMessage({
        title: '您收到了一份节日祝福',
        desc: "湖北省公会给您发送了一份妇女节的祝福",
        link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx81d075add9f24883&redirect_uri=http%3a%2f%2fwww.xu1s.com&response_type=code&scope=snsapi_userinfo&state=ENTER#wechat_redirect',
        imgUrl: "http://7xiqx7.com1.z0.glb.clouddn.com/head.jpg",
        type: 'link',
        dataUrl: '',
        success: function() {},
        cancel: function() {}
    });
});
