$(document).ready(function () {
    $('#firstDetail').click(function () {
        if ($('#firstDetail').attr('class') == 'fas fa-search-plus') {
            $('#firstName').fadeIn("slow", function () {
                $('#firstDetail').attr("class", "fas fa-search-minus")
            });
        }else{
            $('#firstName').fadeOut("slow", function () {
                $('#firstDetail').attr("class", "fas fa-search-plus")
            });
        }
    });
    $('#secondDetail').click(function () {
        if ($('#secondDetail').attr('class') == 'fas fa-search-plus') {
            $('#secondName').fadeIn("slow", function () {
                $('#secondDetail').attr("class", "fas fa-search-minus")
            });
        }else{
            $('#secondName').fadeOut("slow", function () {
                $('#secondDetail').attr("class", "fas fa-search-plus")
            });
        }
    });
    $('#thirdDetail').click(function () {
        if ($('#thirdDetail').attr('class') == 'fas fa-search-plus') {
            $('#thirdName').fadeIn("slow", function () {
                $('#thirdDetail').attr("class", "fas fa-search-minus")
            });
        }else{
            $('#thirdName').fadeOut("slow", function () {
                $('#thirdDetail').attr("class", "fas fa-search-plus")
            });
        }
    });
    $('.bannerWord').css('color','black');
    $('.bannerWord').css('background-color','transparent');
    $('.classy-menu').css('background-color','transparent');
    $('#loginBtn').css('color','black');
    $('#brandLogo').attr("src","../static/img/core-img/logo_black.png");
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop();
        if(scrollTop<=0){
            console.log('test');
            $('.bannerWord').css('color','black');
            $('#loginBtn').css('color','black');
            $('#brandLogo').attr("src","../static/img/core-img/logo_black.png");
            $('.bannerWord').css('background-color','transparent');
            $('.classy-menu').css('background-color','transparent');
        }else{
            $('.bannerWord').css('color','#ffffff');
            $('#loginBtn').css('color','#ffffff');
            $('#brandLogo').attr('src',"../static/img/core-img/logo.png");
            $('.bannerWord').css('background-color','black');
            $('.classy-menu').css('background-color','black');
        }
    });
    function progress(percent, $element) {
        var widthProgress = $('.progress').width() ;
        var progressBarWidth = percent * widthProgress / 100;
        var revenue = percent*25000 ;
        var revenueDigital = revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        $element.animate({ width: progressBarWidth }, 3000).html("$"+revenueDigital+"　　"　+ percent + "%");
    }
    progress(80, $('#firstProfolio'));
    progress(100, $('#secondProfolio'));
    progress(45, $('#thirdProfolio'));
});


