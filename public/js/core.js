$(document).ready(function() {
    var flowerId,
        flowerName,
        flowerContent,
        fromName,
        toName,
        toContent;

    $('#pages').onepage_scroll({
        sectionContainer: '.content',
        easing: 'ease-in-out',
        animationTime: 800,
        keyboard: false,
        loop: false,
        afterMove: function() {
            window.scrollTo(0, 0);
        }
    });

    $('textarea').focus(function() {
        $(this).parent().addClass('input_mode');
    });
    $('textarea').blur(function() {
        $(this).parent().removeClass('input_mode');
    });
    $(window).on('resize', function() {
        $('.text-container').removeClass('input_mode');
    });

    $('.left').on('click', function() {
        flowerId = $('.send-flower_img').data('flowerid');
        $('.send-flower_img').removeClass('send-flower_img_' + flowerId);
        flowerId = flowerId - 1 == 0 ? 6 : flowerId - 1;
        $('.send-flower_img').data('flowerid', flowerId);
        $('.send-flower_img').addClass('send-flower_img_' + flowerId);
    });
    $('.right').on('click', function() {
        flowerId = $('.send-flower_img').data('flowerid');
        $('.send-flower_img').removeClass('send-flower_img_' + flowerId);
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
                flowerContent = "神秘高雅的郁金香，蕴含了对你永恒的祝愿，为荣誉而作，为家人而作的你，是我们最美的半边天。";
                break;
            default:
                flowerName = "百合";
                flowerContent = "简单大方的百合，饱含对你最美好的祝福，愿心想事成，阖家欢乐。";
                break;
        }
        $('#flower_name').text(flowerName);
        $('#flower_content').text(flowerContent);
    });
    $('#make_prv').on('click', function(){
        console.log('test');
        toName = $('#to_name').val();
        toContent = $('#flower_content').val();
        if(toName.length < 1){
            alert('请输入她的名字哦！');
            return;
        }
        if(toContent.length < 1){
            toContent = flowerContent;
        }
        $('#to_name_prv').text(toName);
        $('#to_content_prv').text(toContent).append('</br>' + fromName);
        $('#next_page').click();
    })
});
