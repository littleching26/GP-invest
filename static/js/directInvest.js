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
    $('.bannerWord').css('background-color', 'transparent');
    $('.classy-menu').css('background-color', 'transparent');
    $('#loginBtn').css('color', 'black');
    $('#brandLogo').attr("src", "../static/img/core-img/logo_black.png");
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        if (scrollTop <= 0) {
            console.log('test');
            $('.bannerWord').css('color', 'black');
            $('#loginBtn').css('color', 'black');
            $('#brandLogo').attr("src", "../static/img/core-img/logo_black.png");
            $('.bannerWord').css('background-color', 'transparent');
            $('.classy-menu').css('background-color', 'transparent');
        } else {
            $('.bannerWord').css('color', '#ffffff');
            $('#loginBtn').css('color', '#ffffff');
            $('#brandLogo').attr('src', "../static/img/core-img/logo.png");
            $('.bannerWord').css('background-color', 'black');
            $('.classy-menu').css('background-color', 'black');
        }
    });
    function progress(percent, $element) {
        var widthProgress = $('.progress').width();
        var progressBarWidth = percent * widthProgress / 100;
        var revenue = percent * 25000;
        if (percent >= 200) {
            $element.addClass('bg-info');
        } else if (percent >= 150 && percent < 200) {
            $element.addClass('bg-danger');
        } else if (percent >= 100 && percent < 150) {
            $element.addClass('bg-warning');
        } else if (percent >= 50 && percent < 100) {
            $element.addClass('bg-primary');
        } else {
            $element.addClass('bg-success');
        }
        var revenueDigital = revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        $element.animate({ width: progressBarWidth }, 1100).html("$" + revenueDigital + "　　" + percent + "%");
    }
    progress(80, $('#firstProfolio'));
    progress(100, $('#secondProfolio'));
    progress(45, $('#thirdProfolio'));
    progress(120, $('#fourthProfolio'));
    progress(200, $('#fifthProfolio'));
    progress(168, $('#sixthProfolio'));
    progress(7, $('#seventhProfolio'));
    progress(57, $('#eighthProfolio'));
    progress(25, $('#ninthProfolio'));

    $('#myModal').on('hidden.bs.modal', function () {
        $('#investMoney').val('');
        $('#plzInput').css('display', 'none');
    });
    function changeProgress(percent, money, $element) {
        $element.animate({ width: 0 }).html("");
        var widthProgress = $('.progress').width();
        var progressBarWidth = percent * widthProgress / 100;
        $element.removeClass($element[0].className.split(' ')[1]);
        setTimeout(function () {
            $element.animate({ width: progressBarWidth }, 0).html("$" + money + "　　" + percent + "%");
            if (percent >= 200) {
                $element.addClass('bg-info');
            } else if (percent >= 150 && percent < 200) {
                $element.addClass('bg-danger');
            } else if (percent >= 100 && percent < 150) {
                $element.addClass('bg-warning');
            } else if (percent >= 50 && percent < 100) {
                $element.addClass('bg-primary');
            } else {
                $element.addClass('bg-success');
            }
        }, 1000);
    }
    var $thisBtn = ""
    $('.btn-cus').click(function () {
        $thisBtn = $(this);
        $('#handIn').click(function () {
            if ($('#investMoney').val() == '' || isNaN(parseInt($('#investMoney').val())) == true) {
                $('#plzInput').css('display', 'block');
            } else {
                
                var tmpStr = $thisBtn.closest('td').next().text();
                var tmpArr = tmpStr.split(' ');
                $('#handIn').attr('data-dismiss','modal');
                for (var i = 0; i < tmpArr.length; i++) {
                    if (tmpArr[i] != "" && tmpArr[i] != "\n") {
                        var process = tmpArr[i].split('　　');
                        var percentMoney = parseInt(process[0].replace(/,/g, '').replace('$', '')) / parseInt(process[1].replace('%', ''));
                        var plusPercent = parseInt($('#investMoney').val()) / percentMoney + parseInt(process[1].replace('%', ''));
                        var plusMoney = parseInt(process[0].replace(/,/g, '').replace('$', '')) + parseInt($('#investMoney').val())
                        changeProgress(plusPercent, plusMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), $thisBtn.closest('td').next().find('.progress-bar'));
                    }
                }
            }
        });
    })




});


