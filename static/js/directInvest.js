$(document).ready(function () {
    showDetail($('#firstDetail'), $('#firstName'))
    showDetail($('#secondDetail'), $('#secondName'))
    showDetail($('#thirdDetail'), $('#thirdName'))
    showDetail($('#fourthDetail'), $('#fourthName'))
    showDetail($('#fifthDetail'), $('#fifthName'))
    showDetail($('#sixthDetail'), $('#sixthName'))
    showDetail($('#seventhDetail'), $('#seventhName'))
    showDetail($('#eighthDetail'), $('#eighthName'))
    showDetail($('#ninthDetail'), $('#ninthName'))

    function showDetail($element, $elementName) {
        $element.click(function () {
            if ($element.attr('class') == 'fas fa-search-plus') {
                $($elementName).fadeIn("slow", function () {
                    $element.attr("class", "fas fa-search-minus")
                });
            } else {
                $($elementName).fadeOut("slow", function () {
                    $element.attr("class", "fas fa-search-plus")
                });
            }
        });
    }

    $('.bannerWord').css('color', 'black');
    $('#loginBtn').css('color', 'black');
    $('#brandLogo').attr("src", "../static/img/core-img/logo_black.png");
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        if (scrollTop <= 0) {
            console.log('test');
            $('.bannerWord').css('color', 'black');
            $('#loginBtn').css('color', 'black');
            $('#brandLogo').attr("src", "../static/img/core-img/logo_black.png");
        } else {
            $('.bannerWord').css('color', '#ffffff');
            $('#loginBtn').css('color', '#ffffff');
            $('#brandLogo').attr('src', "../static/img/core-img/logo.png");
        }
    });
    function progress(percent, $element) {
        var widthProgress = $('.progress').width();
        var progressBarWidth = percent * widthProgress / 100;
        var revenue = percent * 25000;
        var revenueDigital = revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        $element.animate({ width: progressBarWidth }, 1100).html("$" + revenueDigital + "　　" 　+ percent + "%");
    }
    progress(80, $('#firstProfolio'));
    progress(100, $('#secondProfolio'));
    progress(45, $('#thirdProfolio'));
    progress(120, $('#fourthProfolio'));
    progress(200, $('#fifthProfolio'));
    progress(32, $('#sixthProfolio'));
    progress(7, $('#seventhProfolio'));
    progress(19, $('#eighthProfolio'));
    progress(25, $('#ninthProfolio'));
});


