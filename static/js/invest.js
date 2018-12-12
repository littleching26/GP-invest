$(document).ready(function () {
    $('#firstDetail').click(function () {
        if ($('#firstDetail').attr('class') == 'fas fa-search-plus') {
            $('#firstName').fadeIn("slow", function () {
                $('#firstDetail').attr("class", "fas fa-search-minus")
            });
        } else {
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
        } else {
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
        } else {
            $('#thirdName').fadeOut("slow", function () {
                $('#thirdDetail').attr("class", "fas fa-search-plus")
            });
        }
    });
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

    $('#myModal').on('hidden.bs.modal', function () {
        $('#investMoney').val('');
        $('#plzInput').css('display', 'none');
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
        $element.animate({ width: progressBarWidth }, 3000).html("$" + revenueDigital + "　　" + percent + "%");
    }
    progress(80, $('#firstProfolio'));
    progress(100, $('#secondProfolio'));
    progress(45, $('#thirdProfolio'));

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
                $('#handIn').attr('data-dismiss', 'modal');
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


