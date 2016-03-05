$(document).ready(function() {
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

});
