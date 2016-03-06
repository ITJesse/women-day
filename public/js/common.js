$(document).on('ready', function(){
    $('#bgmusic_toggle').on('click', function(){
        if($(this).hasClass('music-toggle_on')){
            $(this).removeClass('music-toggle_on');
            $(this).addClass('music-toggle_off');
            document.getElementById('bgmusic').pause();
        }else{
            $(this).removeClass('music-toggle_off');
            $(this).addClass('music-toggle_on');
            document.getElementById('bgmusic').play();
        }
    });
    document.getElementById('bgmusic').play();
    //必须在微信Weixin JSAPI的WeixinJSBridgeReady才能生效
    document.addEventListener("WeixinJSBridgeReady", function () {
        document.getElementById('bgmusic').play();
    }, false);
})
