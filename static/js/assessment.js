var count = 0;
var pageNum = 1;
var A_num = 0;
var B_num = 0;
var C_num = 0;
var D_num = 0;
$(document).ready(function () {
    $('#myModal').on('hidden.bs.modal', function () {
        count = 0;
        pageNum = 1;
        A_num = 0;
        B_num = 0;
        C_num = 0;
        D_num = 0;
        $('#questionContent').html('');
    });


    $("#nextQuestion").click(function () {
        countABCD();
        if ($("#nextQuestion").text() == 'Done') {
            window.location.href = 'invest';
        } else if ($("#nextQuestion").text() == 'Go To The Next Part') {
            pageNum++;
            runFieldContent();
            console.log(A_num, B_num, C_num, D_num);
            var personType = personalityType(A_num, B_num, C_num, D_num);
            console.log(personType);
        } else {
            pageNum++;
            runFieldContent();
        }
    });

});


function redirect() {
    window.location.href = 'directInvest';
}
function runFieldContent() {
    var xmlhttp = new XMLHttpRequest();
    var readQuestion = '';
    var questionArr = new Array();
    var questionArr = new Array();
    xmlhttp.overrideMimeType("text/html;charset=utf8");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
            readQuestion = xmlhttp.responseText;
            questionArr = readQuestion.split("\r\n");
            fieldFormHtml(questionArr);
            detectFormClick();
        }
    };
    if (count < 25) {
        xmlhttp.open("GET", "./static/test.txt", true);
        xmlhttp.send();
    }
    else {
        xmlhttp.open("GET", "./static/securitiesInvestment.txt", true);
        xmlhttp.send();
    }
}

function countABCD() {
    console.log('test');
    for (var i = count; i > count - 5; i--) {
        var stringValue = $("#rb-" + i).find('.rb-tab-active').attr("data-value")
        switch (stringValue) {
            case 'A':
                A_num += 1;
                break;
            case 'B':
                B_num += 1;
                break;
            case 'C':
                C_num += 1;
                break;
            case 'D':
                D_num += 1;
                break;
        }
    }
}
function personalityType(A_num, B_num, C_num, D_num) {
    var maxValue = A_num;
    var type = '影響型';
    if (B_num > maxValue) {
        type = '支配型';
    } else if (C_num > maxValue) {
        type = '分析型';
    } else {
        type = '穩健型';
    }
    return type;
}
function detectFormClick() {

    $(".rb-tab").click(function () {
        if ($(this).attr("data-value") != undefined) {
            $(this).parent().find(".rb-tab").removeClass("rb-tab-active");
            $(this).addClass("rb-tab-active");
        }
    });
    $(".partIIcontent").click(function () {
        if ($(this).attr("data-value") != undefined) {
            if ((count - 25) == 3) {
                $(this).addClass("partIIcontent-active");
            } else {
                $(this).parent().find(".partIIcontent").removeClass("partIIcontent-active");
                $(this).addClass("partIIcontent-active");
            }
        }
    });
};
function fieldFormHtml(questionArr) {
    console.log(questionArr);
    $('#questionContent').html('');
    var formHtml = '<div class="rb-box">';
    console.log(count);
    if (count < 25) {
        for (var i = count; i < count + 5; i++) {
            var tmpArr = new Array();
            var strArr = questionArr[i];
            console.log(strArr);
            tmpArr = strArr.split(' ');
            formHtml += '<div id="rb-' + (i + 1).toString() + '"class="rb"><div class="rb-tab">\
            <div class="rb-spot" style="margin-left:35%;"><div>'+ (i + 1).toString() + '</div></div></div><div class="rb-tab" data-value="A">\
            <div class="rb-spot"><div>'+ tmpArr[0] + '</div></div></div><div class="rb-tab" data-value="B">\
            <div class="rb-spot"><div>'+ tmpArr[1] + '</div></div></div><div class="rb-tab" data-value="C">\
            <div class="rb-spot"><div>'+ tmpArr[2] + '</div></div></div><div class="rb-tab" data-value="D">\
            <div class="rb-spot"><div>'+ tmpArr[3] + '</div></div></div></div><br><br>';
        }
        count += 5;
        $('#pageNum').text(pageNum + '/5');
    } else {
        $('#part').text('Part II 風險屬性分析');
        var tmpArr = new Array();
        var strArr = questionArr[(count - 25)];
        tmpArr = strArr.split(' ');
        formHtml += '<div id="rb-' + count.toString() + '><div class="qtitle">' + (count - 24).toString() + '　　' + tmpArr[0] + '</div><br>\
            <div class="partIIcontent"data-value="A">'+ tmpArr[1] + '</div><br>\
            <div class="partIIcontent" data-value="B">'+ tmpArr[2] + '</div><br>\
            <div class="partIIcontent" data-value="C">'+ tmpArr[3] + '</div><br>\
            <div class="partIIcontent" data-value="D">'+ tmpArr[4] + '</div><br>\
            <div class="partIIcontent" data-value="E">'+ tmpArr[5] + '</div><br></div>';
        count++;
        $('#pageNum').text(pageNum + '/12');
        $('#nextQuestion').text('Next');
    }
    if (count == 25) {
        $('#nextQuestion').text('Go To The Next Part');
        pageNum = 0;
    }
    if (count == 37) {
        $('#nextQuestion').text('Done');
    }
    $('#questionContent').html(formHtml);
}


