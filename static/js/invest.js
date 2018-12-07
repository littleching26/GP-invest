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
    $('#loginBtn').css('color','black');
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop();
        if(scrollTop<=0){
            console.log('test');
            $('.bannerWord').css('color','black');
            $('#loginBtn').css('color','black');
        }else{
            $('.bannerWord').css('color','#ffffff');
            $('#loginBtn').css('color','#ffffff');
        }
    })
});

