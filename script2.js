$(function () {

    // ページ内リンクのスクロールをなめらかにする（スムーズスクロール）
    $('a[href^="#"]').click(function () {

        const wid = $(window).width();
        if (wid < 992) {
            $('#navbarNav').slideUp();
            $('.hamburger_btn').removeClass('open');
            $('.hamburger_btn i').removeClass('fa-xmark');
            $('.hamburger_btn i').addClass('fa-bars');
        }
        const $target = $($(this).attr('href'));
        const $ta = $(this).attr('href');

        const position = $target.offset().top;
        if ($ta !== "#") {
            $('html, body').animate({
                'scrollTop': position
            }, 500, 'swing');

        } else {
            $('html, body').animate({
                'scrollTop': 0
            }, 500, 'swing');
        }
        return false;
    });









    // ナビゲーション
    $('.hamburger_btn').on('click', function () {
        // フェードイン or フェードアウトする
        if (!$('.hamburger_btn').hasClass('open')) {
            $('.hamburger_btn').addClass('open');
            $('.hamburger_btn i').removeClass('fa-bars');
            $('.hamburger_btn i').addClass('fa-xmark');
            $('#navbarNav').slideDown();

        } else {
            $('.hamburger_btn').removeClass('open');
            $('.hamburger_btn i').removeClass('fa-xmark');
            $('.hamburger_btn i').addClass('fa-bars');
            $('#navbarNav').slideUp();

        }

        return false
    });

    $('.hamburger_btn').hover(
        function () {
            $('.hamburger_btn').css('opacity', '0.9');
            $('.hamburger_btn').css('cursor', 'pointer');
        },
        function () {
            $('.hamburger_btn').css('opacity', '1');

        }
    );

    $('.navbar-nav a').hover(
        function () {
            if (!$(this).hasClass('nav_now')) {
                $(this).addClass('nav_hover');
            }
        },
        function () {
            $(this).removeClass('nav_hover');

        }
    );


    // ナビゲーションのホバー

    $(window).scroll(function () {
        const scrollAmount = $(window).scrollTop();

        if (scrollAmount > 200) {
            $('.n5, .n6').removeClass('nav_now');
            $('.n6').addClass('nav_now');

        } else {
            $('.n5, .n6').removeClass('nav_now');
            $('.n5').addClass('nav_now');
        }

    });





    // AjaxでSTATIC FORMSにデータを送信
    $('#submit').on('click', function (event) {
        
         $(".reset").prop('disabled', false);
            $('.reset').addClass('reset1');
        // formタグによる送信を拒否
        event.preventDefault();

        // 入力チェックをした結果、エラーがあるかないか判定
        let result = inputCheck();

        // エラー判定とメッセージを取得
        let error = result.error;
        let message = result.message;


        let origin_name = $('#name').val();
        let origin_messag = $('#message').val();
        let origin_email = $('#email').val();


        $('#name').val('\n 名前:「' + $('#name').val() + '\n 」,フリガナ:「' + $('#furigana').val() + '」');
        $('#message').val('\n メッセージ:「' + $('#message').val() + '」,例:「' + $('[name="example"]').val() + '\n 」,お問い合わせ内容:「' + $('[name="contents"]').val() + '」');
        $('#email').val('\n メールアドレス:「' + $('#email').val() + '\n 」,電話番号:「' + $('#tel').val() + '」');


        // エラーが無かったらフォームを送信する
        if (error == false) {
            // Ajaxでformを送信する
            $.ajax({
                url: 'https://api.staticforms.xyz/submit',
                type: 'POST',
                dataType: 'json',
                data: $('#form').serialize(),
                success: function (result) {
                    $('#message, #name, #furigana, #tel, #email').val('');
                    $('#email').val('');
                    $('#agree').prop('checked', false);
                    $('[name="example"]').prop('checked', false);
                    $('[name="contents"]').val('text1')
                    alert('お問い合わせを送信しました。')

                    origin_name = "";
                    origin_messag = "";
                    origin_email = "";
                },
                error: function (xhr, resp, text) {

                    alert('お問い合わせを送信できませんでした。')
                }
            })


        } else {
            // エラーメッセージを表示する

            alert(message);
        }

        $('#name').val(origin_name);
        $('#message').val(origin_messag);
        $('#email').val(origin_email);
    });

    // フォーカスが外れたとき（blur）にフォームの入力チェックをする
    $('#name').blur(function () {


        if ($('#name').val() == '') {
            // エラーあり
            $('#name').css('background-color', '#f79999');

        } else {
            // エラーなし
            $('#name').css('background-color', '#fafafa');
        }
    });
    $('#name').on("input", function () {

        if ($('#name').val() == '') {
            // エラーあり

        } else {
            // エラーなし
            $('#name').css('background-color', '#fafafa');
        }
    });




    $('#furigana').blur(function () {

        // フリガナのチェック
        if ($('#furigana').val() == '' || !$('#furigana').val().match(/^[\u3040-\u309f]+[\　\ ]*([\u3040-\u309f]+)[\　\ ]*([\u3040-\u309f]+)$/)) {
            // エラーあり
            $('#furigana').css('background-color', '#f79999');

        } else {
            // エラーなし
            $('#furigana').css('background-color', '#fafafa');
        }
    });
    $('#furigana').on("input", function () {



        // フリガナのチェック
        if ($('#furigana').val() == '' || !$('#furigana').val().match(/^[\u3040-\u309f]+[\　\ ]*([\u3040-\u309f]+)[\　\ ]*([\u3040-\u309f]+)$/)) {
            // エラーあり
            // $('#furigana').css('background-color', '#f79999');

        } else {
            // エラーなし
            $('#furigana').css('background-color', '#fafafa');
        }
    });



    $('#email').blur(function () {

        // console.log($('#email').val().length);
        // メールアドレスのチェック
        if ($('#email').val() == '' || $('#email').val().indexOf('@') == -1 || $('#email').val().indexOf('.') == -1 || !$('#email').val().match(/^[a-zA-Z0-9][a-zA-Z0-9\.\_\$\=\?\^\`\{\}\~\#\-]*[a-zA-Z0-9]@[a-zA-Z0-9][a-zA-Z0-9\.\_\$\=\?\^\`\{\}\~\#\-]*\.[a-zA-Z0-9\.\_\-]+$/) || $('#email').val().match(/[\.][\.]/) || $('#email').val().match(/[\_][\_]/) || $('#email').val().match(/[\.]$/) || $('#email').val().length > 256 || $('#email').val().match(/^([\.\_\$\=\?\^\`\{\}\~\#\@\-]+)$/) || $('#email').val().match(/([\.\_\$\=\?\^\`\{\}\~\#\-][\.\_\$\=\?\^\`\{\}\~\#\-])$/)) {
            // エラーあり
            // || $('#email').val().match(/^[\._-\$\=\?\^\`\{\}\~\#@]+$/) || $('#email').val().match(/([\._-\$\=\?\^\`\{\}\~\#][\._-\$\=\?\^\`\{\}\~\#])$/) 
            // \$\=\?\^\`\{\}\~\#
            $('#email').css('background-color', '#f79999');


        } else {
            // エラーなし
            $('#email').css('background-color', '#fafafa');
        }
    });

    $('#email').on("input", function () {


        // メールアドレスのチェック
        if ($('#email').val() == '' || $('#email').val().indexOf('@') == -1 || $('#email').val().indexOf('.') == -1 || !$('#email').val().match(/^[a-zA-Z0-9][a-zA-Z0-9\.\_\$\=\?\^\`\{\}\~\#\-]*[a-zA-Z0-9]@[a-zA-Z0-9][a-zA-Z0-9\.\_\$\=\?\^\`\{\}\~\#\-]*\.[a-zA-Z0-9\.\_\-]+$/) || $('#email').val().match(/[\.][\.]/) || $('#email').val().match(/[\_][\_]/) || $('#email').val().match(/[\.]$/) || $('#email').val().length > 256 || $('#email').val().match(/^([\.\_\$\=\?\^\`\{\}\~\#\@\-]+)$/) || $('#email').val().match(/([\.\_\$\=\?\^\`\{\}\~\#\-][\.\_\$\=\?\^\`\{\}\~\#\-])$/)) {
            // エラーあり



        } else {
            // エラーなし
            $('#email').css('background-color', '#fafafa');
        }
    });




    $('#tel').blur(function () {
        if($('#tel').val() != '' ){
        if (!$('#tel').val().match(/^0([0-9]+)[\-]([0-9]+)[\-][0-9]{4}$/) || $('#tel').val().length > 18 || $('#tel').val().length < 12 || $('#tel').val().match(/^([0\-]*)$/)) {
            // エラーあり
            $('#tel').css('background-color', '#f79999');

        } else {
            // エラーなし
            $('#tel').css('background-color', '#fafafa');
        }
        
        }else{ $('#tel').css('background-color', '#fafafa');
        }

    });
    $('#tel').on("input", function () {
        if($('#tel').val() != '' ){
        if ( !$('#tel').val().match(/^0([0-9]+)[\-]([0-9]+)[\-][0-9]{4}$/) ||  $('#tel').val().length > 18 || $('#tel').val().length < 12 || $('#tel').val().match(/^([0\-]*)$/) ) {
            // エラーあり


        } else {
            // エラーなし
            $('#tel').css('background-color', '#fafafa');
        }
        }else{ $('#tel').css('background-color', '#fafafa');
        }
        

    });




    $('#message').blur(function () {



        // お問い合わせのチェック
        if ($('#message').val() == '') {
            // エラーあり
            $('#message').css('background-color', '#f79999');

        } else {
            // エラーなし
            $('#message').css('background-color', '#fafafa');
        }
    });

    $('#message').on("input", function () {



        // お問い合わせのチェック
        if ($('#message').val() == '') {
            // エラーあり
            // $('#message').css('background-color', '#f79999');

        } else {
            // エラーなし
            $('#message').css('background-color', '#fafafa');
        }
    });



    // $('#agree').click(function () {
    // inputCheck();
    // });

    // お問い合わせフォームの入力チェック
    function inputCheck() {
        // エラーのチェック結果
        let result;

        // エラーメッセージのテキスト
        let message = '';

        // エラーがなければfalse、エラーがあればtrue
        let error = false;

        // お名前のチェック
        if ($('#name').val() == '') {
            // エラーあり
            $('#name').css('background-color', '#f79999');
            error = true;
            message += 'お名前をご入力してください。\n';
        } else {
            // エラーなし
            $('#name').css('background-color', '#fafafa');
        }

        // フリガナのチェック
        if ($('#furigana').val() == '' ||  !$('#furigana').val().match(/^[\u3040-\u309f]+[\　\ ]*([\u3040-\u309f]+)[\　\ ]*([\u3040-\u309f]+)$/)) {
            // エラーあり
            $('#furigana').css('background-color', '#f79999');
            error = true;
            message += 'ふりがなをご入力してください。\n';
        } else {
            // エラーなし
            $('#furigana').css('background-color', '#fafafa');
        }

        // お問い合わせのチェック
        if ($('#message').val() == '') {
            // エラーあり
            $('#message').css('background-color', '#f79999');
            error = true;
            message += 'お問い合わせ内容をご入力してください。\n';
        } else {
            // エラーなし
            $('#message').css('background-color', '#fafafa');
        }

        // メールアドレスのチェック
        if ($('#email').val() == '' || $('#email').val().indexOf('@') == -1 || $('#email').val().indexOf('.') == -1 || !$('#email').val().match(/^[a-zA-Z0-9][a-zA-Z0-9\.\_\$\=\?\^\`\{\}\~\#\-]*[a-zA-Z0-9]@[a-zA-Z0-9][a-zA-Z0-9\.\_\$\=\?\^\`\{\}\~\#\-]*\.[a-zA-Z0-9\.\_\-]+$/) || $('#email').val().match(/[\.][\.]/) || $('#email').val().match(/[\_][\_]/) || $('#email').val().match(/[\.]$/) || $('#email').val().length > 256 || $('#email').val().match(/^([\.\_\$\=\?\^\`\{\}\~\#\@\-]+)$/) || $('#email').val().match(/([\.\_\$\=\?\^\`\{\}\~\#\-][\.\_\$\=\?\^\`\{\}\~\#\-])$/)) {
            // エラーあり
            $('#email').css('background-color', '#f79999');
            error = true;
            message += '正しいメールアドレスをごご入力ください。\n';
        } else {
            // エラーなし
            $('#email').css('background-color', '#fafafa');
        }

        // 電話番号のチェック（未入力はOK、未入力でない場合は-が必要）
      if($('#tel').val() != '' ){
        if (!$('#tel').val().match(/^0([0-9]+)[\-]([0-9]+)[\-][0-9]{4}$/) || $('#tel').val().length > 18 || $('#tel').val().length < 12 || $('#tel').val().match(/^([0\-]*)$/)) {
            // エラーあり



            error = true;
            message += '電話番号をご記入下さる場合、「-」を入れ正しくご入力ください。\n';
            $('#tel').css('background-color', '#f79999');
        } else {
            // エラーなし
            $('#tel').css('background-color', '#fafafa');
        }
      }else{
           $('#tel').css('background-color', '#fafafa');
      }

        // 個人情報のチェックボックスのチェック
        if ($('#agree').prop('checked') == false) {
            error = true;
            message += '個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックしてください。\n';
            $('.kiyaku a').css('color', '#f79999');
        }

        // エラーの有無で送信ボタンを切り替え
        if (error == true) {
            $('#submit').attr('src', 'images/button-submit.png');
        } else {
            $('#submit').attr('src', 'images/button-submit-blue.png');
        }

        // オブジェクトでエラー判定とメッセージを返す
        result = {
            error: error,
            message: message
        };

        // 戻り値としてエラーがあるかどうかを返す
        return result;


    }








    $('#email, #name, #furigana, #tel, #message').on("input", function () {
        let inpu = $(this).val();

        console.log($('#email').css('background-color'));
        
        
        $('.kiyaku a').css('color', 'black');

        // 入力文字があればボタンを押せる、なければボタンを押せなくする
        if (inpu || $('#email').css('background-color') == 'rgb(247, 153, 153)' || $('#name').css('background-color') == 'rgb(247, 153, 153)' || $('#furigana').css('background-color') == 'rgb(247, 153, 153)' || $('#tel').css('background-color') == 'rgb(247, 153, 153)' || $('#message').css('background-color') == 'rgb(247, 153, 153)' ) {
            $(".reset").prop('disabled', false);
            $('.reset').addClass('reset1');
        } else {
            $(".reset").prop('disabled', true);
            $('.reset').removeClass('reset1');
        }
    });

    $('#email, #name, #furigana, #tel, #message').blur(function () {

        if ($('#email').css('background-color') == 'rgb(247, 153, 153)' || $('#name').css('background-color') == 'rgb(247, 153, 153)' || $('#furigana').css('background-color') == 'rgb(247, 153, 153)' || $('#tel').css('background-color') == 'rgb(247, 153, 153)' || $('#message').css('background-color') == 'rgb(247, 153, 153)') {
            $(".reset").prop('disabled', false);
            $('.reset').addClass('reset1');
        }


    });



    $(".reset").on('click', function () {
        $(".qw").prop('disabled', false);

        setTimeout(() => {
            $('#email, #name, #furigana, #tel, #message').css('background-color', '#fafafa');
            $(".reset").prop('disabled', true);
            $('.reset').removeClass('reset1');
            $('.kiyaku a').css('color', 'black');
        }, 100);



    });
    
    
    
    $('[name="example"]').on('change', function () {
        
        // if($('[name="example"]').prop('checked') !== false){
             $(".reset").prop('disabled', false);
            $('.reset').addClass('reset1');
        // }
    
    });
    
    
     $('[name="contents"]').on('change', function () {
        
        if( $('[name="contents"]').val() !== "origin"){
             $(".reset").prop('disabled', false);
            $('.reset').addClass('reset1');
             $(".qw").prop('disabled', true);
            
        }else{
             $(".reset").prop('disabled', true);
            $('.reset').removeClass('reset1');
        }
    
    });
    
   
    

});
