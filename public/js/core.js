$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return results[1] || 0;
    }
}

$(document).ready(function() {
    var flowerId,
        flowerName,
        flowerContent,
        fromName,
        fromImg,
        toName,
        toContent;

    var url = encodeURIComponent(window.location.href.replace(/\/$/, ''));
    $('body').append('<script src="/wechat?url=' + url + '"></script>');
    var code = $.urlParam('code');
    if (!code) {
        // alert(url);
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx81d075add9f24883&redirect_uri=" + url + "&response_type=code&scope=snsapi_userinfo&state=ENTER#wechat_redirect";
    } else {
        $.ajax({
            url: "/API/GetUserInfo",
            type: "get",
            dataType: "json",
            data: {
                code: code
            },
            success: function(data) {
                // console.log(data)
                fromName = data.nickname;
                fromImg = data.headimgurl;
            }
        })
    }

    $('#pages').onepage_scroll({
        sectionContainer: '.content',
        easing: 'ease-in-out',
        animationTime: 800,
        keyboard: false,
        loop: false,
        pagination: false,
        afterMove: function() {
            window.scrollTo(0, 0);
        }
    });

    $('textarea').focus(function() {
        $(this).parent().addClass('input_mode');
    });
    $('textarea').on('click', function() {
        $(this).parent().addClass('input_mode');
    });
    $('textarea').blur(function() {
        $(this).parent().removeClass('input_mode');
    });
    var viewHeight = $(window).height();
    $(window).on('resize', function() {
        if(viewHeight < $(window).height()){
            $('.text-container').removeClass('input_mode');
        }
        viewHeight = $(window).height();
    });

    $('.left').on('click', function() {
        flowerId = $('.send-flower_img').data('flowerid');
        $('.send-flower_img').removeClass('send-flower_img_' + flowerId);
        $('#postcard_prv').removeClass('send-postcard_img' + flowerId);
        flowerId = flowerId - 1 == 0 ? 6 : flowerId - 1;
        $('.send-flower_img').data('flowerid', flowerId);
        $('.send-flower_img').addClass('send-flower_img_' + flowerId);
    });
    $('.right').on('click', function() {
        flowerId = $('.send-flower_img').data('flowerid');
        $('.send-flower_img').removeClass('send-flower_img_' + flowerId);
        $('#postcard_prv').removeClass('send-postcard_img' + flowerId);
        flowerId = flowerId + 1 > 6 ? 1 : flowerId + 1;
        $('.send-flower_img').data('flowerid', flowerId);
        $('.send-flower_img').addClass('send-flower_img_' + flowerId);
    });
    $('.left, .right').on('click', function() {
        flowerId = $('.send-flower_img').data('flowerid');
        switch (flowerId) {
            case 1:
                flowerName = "百合";
                flowerContent = "简单大方的百合，饱含对你最美好的祝福，愿心想事成，阖家欢乐。";
                break;
            case 2:
                flowerName = "康乃馨";
                flowerContent = "朴实素雅的康乃馨，寄托着我对你最真诚的祝福和对伟大母爱的赞许。";
                break;
            case 3:
                flowerName = "满天星";
                flowerContent = "素雅可爱的满天星，寄寓了对你纯纯的关怀与仰慕，愿你永远十八岁。";
                break;
            case 4:
                flowerName = "玫瑰"
                flowerContent = "浓烈纯真的玫瑰，是我对你最浪漫的祝福，愿世界待你温柔。";
                break;
            case 5:
                flowerName = "牡丹";
                flowerContent = "浓郁丰满的牡丹，只为祝福你生活圆满，时光不老，融化延年。";
                break;
            case 6:
                flowerName = "郁金香";
                flowerContent = "高雅的郁金香是对你永恒的祝愿，努力奋斗的你是社会的半边天！";
                break;
            default:
                flowerName = "百合";
                flowerContent = "简单大方的百合，饱含对你最美好的祝福，愿心想事成，阖家欢乐。";
                break;
        }
        $('#flower_name').text(flowerName);
        $('#flower_content').text(flowerContent);
    });
    $('#make_prv').on('click', function() {
        flowerId = $('.send-flower_img').data('flowerid');
        toName = $('#to_name').val();
        toContent = $('#flower_content').val();
        if (toName.length < 1) {
            alert('请输入她的名字哦！');
            return;
        }
        if (toContent.length < 1) {
            toContent = flowerContent;
        }
        if (toContent.length > 30) {
            alert('祝福语只能写30字，太多明信片写不下哦！');
            return;
        }
        $('#postcard_prv').addClass('send-postcard_img' + flowerId);
        $('#to_name_prv').text(toName);
        if (!fromName) fromName = "某某";
        $('#to_content_prv').text(toContent).append('</br>' + fromName);
        $('#next_page').click();
    });
    $('.send-submit').on('click', function() {
        $('[class^=share]').removeClass('share_off');
        $.ajax({
            url: "/API/InsertCard",
            type: "post",
            dataType: "json",
            data: {
                from: fromName,
                to: toName,
                flowerId: flowerId,
                content: toContent
            },
            success: function(data) {
                if(data.err){
                    return alert("发送祝福的人数过多，请稍等片刻～");
                }
                wx.onMenuShareTimeline({
                    title: fromName + '给您发送了一份祝福',
                    link: 'http://www.xu1s.com/show_card?cardId=' + data.cardId,
                    imgUrl: fromImg ? fromImg : "http://7xiqx7.com1.z0.glb.clouddn.com/head.jpg",
                    success: function() {},
                    cancel: function() {}
                });
                wx.onMenuShareAppMessage({
                    title: fromName + '给您发送了一份祝福',
                    desc: "您收到了一份妇女节的祝福",
                    link: 'http://www.xu1s.com/show_card?cardId=' + data.cardId,
                    imgUrl: fromImg ? fromImg : "http://7xiqx7.com1.z0.glb.clouddn.com/head.jpg",
                    type: 'link',
                    dataUrl: '',
                    success: function() {},
                    cancel: function() {}
                });
            }
        });
    });
});
