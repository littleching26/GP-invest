$(document).ready(function () {
    var checkIfStable = 0;
    var count = 0;
    var pageNum = 1;
    var A_num = 0;
    var B_num = 0;
    var C_num = 0;
    var D_num = 0;
    var E_num = 0;
    var part_I_type = '';
    var part_II_type = '';
    $('#riskAssessment').click(function () {
        runFieldContent();
    })
    $('#myModal').on('hidden.bs.modal', function () {
        count = 0;
        pageNum = 1;
        A_num = 0;
        B_num = 0;
        C_num = 0;
        D_num = 0;
        E_num = 0;
        $('#questionContent').html('');
        $('#part').text('Part I 人格測試');
    });

    $('#skip').click(function () {
        for (var i = 1; i < 6; i++) {
            $("#rb-" + i).find("[data-value='A']").addClass('rb-tab-active');
        }
        setTimeout(function () {
            window.location.href = 'invest';
        }, 500);

    });

    $("#nextQuestion").click(function () {
        if(count<=25){
            countABCD();
        }else{
            countPartIIABCD();
        }
        if ($("#nextQuestion").text() == 'Done') {
            if(checkIfStable == 1){
                //do nothing...
            }else{
                part_II_type = calPartIIType(A_num, B_num, C_num, D_num,E_num);
            }
            console.log(part_II_type);
            window.location.href = 'invest'
            // window.location.href = 'invest/'+part_I_type+'/'+part_II_type;
        } else if ($("#nextQuestion").text() == 'Go To The Next Part') {
            pageNum++;
            runFieldContent();
            var personType = personalityType(A_num, B_num, C_num, D_num);
            console.log(A_num, B_num, C_num, D_num) ;
            part_I_type = personType;
            A_num = 0;
            B_num = 0;
            C_num = 0;
            D_num = 0;
            E_num = 0;
            console.log(part_I_type);
        } else {
            if((count-25) == 7){
                console.log('test');
                if($("#rb-" + (count+1)).find('.partIIcontent-active').attr("data-value") == 'A'){
                    part_II_type = '保守型';
                    checkIfStable = 1;
                    console.log(part_II_type);
                }
            }
            pageNum++;
            runFieldContent();
        }
    });
    
    function calPartIIType(A,B,C,D,E){
        var partIIScore = A*2 + B*4 + C*6 + D*8 + E*10;
        if(partIIScore>=15 && partIIScore <=20){
            return '保守型';
        }else if(partIIScore>20 && partIIScore <=27){
            return '安穩型';
        }else if(partIIScore>27 && partIIScore <=35){
            return '穩健型';
        }else if(partIIScore>35 && partIIScore <=45){
            return '成長型';
        }else{
            return '積極型';
        }
    }

    function runFieldContent() {
        var xmlhttp = new XMLHttpRequest();
        var readQuestion = '';
        var questionArr = new Array();
        xmlhttp.overrideMimeType("text/html;charset=utf8");
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
                readQuestion = xmlhttp.responseText;
                questionArr = readQuestion.split("\n");
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
        for (var i = count; i > count - 5; i--) {
            var stringValue = $("#rb-" + i).find('.rb-tab-active').attr("data-value")
            cal(stringValue);
        }
    }
    function cal(stringValue){
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
            case 'E':
                E_num += 1;
            break;
        }
    }

    function countPartIIABCD() {
        var stringValue = $("#rb-" + (count-1)).find('.partIIcontent-active').attr("data-value")
        var pluralActive = $("#rb-" + (count-1)).find('.partIIcontent-active')
        if(pluralActive.length > 1){
            for(var i=0;i<pluralActive.length;i++){
                cal($(pluralActive[i]).attr('data-value'));
            }
        }else{
            cal(stringValue);
        }
        console.log(A_num,B_num,C_num,D_num,E_num);
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
        $('#questionContent').html('');
        var formHtml = '<div class="rb-box">';
        if (count < 25) {
            for (var i = count; i < count + 5; i++) {
                var tmpArr = new Array();
                var strArr = questionArr[i];
                tmpArr = strArr.split(' ');
                formHtml += '<div id="rb-' + (i + 1).toString() + '"class="rb" style="margin-top: 1vh;"><div class="rb-tab">\
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
            formHtml += '<div id="rb-' + count.toString() + '"style="margin-top: 4vh;"><div class="qtitle">' + (count - 24).toString() + '　　' + tmpArr[0] + '</div><br>\
            <div class="partIIcontent" data-value="A" style="margin-top: 2vh;">'+ tmpArr[1] + '</div><br>\
            <div class="partIIcontent" data-value="B" style="margin-top: 2vh;">'+ tmpArr[2] + '</div><br>\
            <div class="partIIcontent" data-value="C" style="margin-top: 2vh;">'+ tmpArr[3] + '</div><br>\
            <div class="partIIcontent" data-value="D" style="margin-top: 2vh;">'+ tmpArr[4] + '</div><br>\
            <div class="partIIcontent" data-value="E" style="margin-top: 2vh;">'+ tmpArr[5] + '</div><br></div>';
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

});
function redirect() {
    window.location.href = 'directInvest';
}
