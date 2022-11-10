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

        const position = $target.offset().top;
        $('html, body').animate({
            'scrollTop': position
        }, 500, 'swing');




        return false;
    });




    // 動く自転車

    $('#myCarousel').hover(
        function () {

            if (!$('.mov_bai').hasClass('done')) {
                $('.mov_bai').addClass('done');

                $('.mov_bai').animate({
                    'left': '52%',
                    'top': 350
                }, 10);
                setTimeout(() => {
                    $('.mov_bai img').attr('src', 'img/006744.png');
                    $('.mov_bai').animate({
                        'left': '25%',

                        'top': 850
                    }, 10);
                }, 8000);


                setTimeout(() => {
                    $('.mov_bai img').attr('src', 'img/redbai.png');
                    $('.mov_bai').animate({
                        'left': '60%',
                        // 'opacity': 0,
                        'top': 1250
                    }, 10);
                }, 15000);

                setTimeout(() => {
                    $('.mov_bai').fadeOut();
                    $('.redbi').css('opacity', '1');

                }, 20000);

            }

        },
        function () {


        }
    );

    // 動く自転車

    $(window).scroll(function () {
        const wid = $(window).width() * 0.3;
        // const baiwid = $('.mov_bai').width();
        const servis = $('#service').offset().top;
        const scrollAmount = $(window).scrollTop();

        const width = wid / servis * scrollAmount;

        const width2 = wid / servis * (servis - 130) + servis - 130 - scrollAmount;

        const scrollStop = $('#gif').offset().top;

        if (!$('.mov_bai').hasClass('done')) {
            $('.mov_bai').addClass('done');

            $('.mov_bai').animate({
                'left': '52%',
                'top': 350
            }, 10);
            setTimeout(() => {
                $('.mov_bai img').attr('src', 'img/006744.png');
                $('.mov_bai').animate({
                    'left': '25%',

                    'top': 850
                }, 10);
            }, 8000);


            setTimeout(() => {
                $('.mov_bai img').attr('src', 'img/redbai.png');
                $('.mov_bai').animate({
                    'left': '60%',
                    // 'opacity': 0,
                    'top': 1250
                }, 10);
            }, 15000);

            setTimeout(() => {
                $('.mov_bai').fadeOut();
                $('.redbi').css('opacity', '1');

            }, 20000);

        }

        if (servis - 130 > scrollAmount) {
            $('.mov_scroll img').attr('src', 'img/自転車.gif');
            $('.mov_scroll').css('top', scrollAmount + 120);
            $('.mov_scroll').css('right', width);
        } else if (width2 > 0) {
            $('.mov_scroll img').attr('src', 'img/自転車反転反転.gif');
            $('.mov_scroll').css('top', scrollAmount + 120);
            $('.mov_scroll').css('right', width2);
        } else if (scrollStop - 120 > scrollAmount) {
            $('.mov_scroll img').attr('src', 'img/自転車.gif');
            $('.mov_scroll').css('top', scrollAmount + 120);
            $('.mov_scroll').css('right', 0);
        } else {
            $('.mov_scroll').fadeOut();
            $('#gif img img').addClass('.right');
            $('#gif img').addClass('mov_gif');
            move();
        }

    });


    setTimeout(() => {
        $('.mov_scroll').fadeOut();
        $('#gif img').addClass('mov_gif');
    }, 300000);



    const move = () => {

        $('#gif img').animate({
            right: "100%"

        }, 6000).animate({
            right: "-100px"

        }, 0);


        const id = setInterval(() => {


            $('#gif img').animate({
                right: "100%"

            }, 6000).animate({
                right: "-100px"

            }, 0);

        }, 7000);

    };





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
        if (scrollAmount > $('#word_of_mouth').offset().top - 320) {
            $('.nav-link').removeClass('nav_now');
            $('.n4').addClass('nav_now');

        } else if (scrollAmount > $('#benefit').offset().top - 40) {
            $('.nav-link').removeClass('nav_now');
            $('.n3').addClass('nav_now');

        } else if (scrollAmount > $('#green_top').offset().top - 40) {
            $('.nav-link').removeClass('nav_now');
            $('.n2').addClass('nav_now');

        } else {
            $('.nav-link').removeClass('nav_now');
            $('.n1').addClass('nav_now');
        }




    });

    // カルーセル




    $('.carousel2').slick({
        autoplay: true,
        dots: true,
        infinite: true,
        autoplaySpeed: 1000,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,

        centerMode: true,


    });

    // スクロールしたときにサービスのテキストをスライドさせる
    $(window).scroll(function () {
        const scrollAmount = $(window).scrollTop();
        const windowHeight = $(window).height();
        $('#benefit h4').each(function () {
            const position = $(this).offset().top;
            if (scrollAmount > position - windowHeight + 50) {
                $(this).addClass('slide');
            }
        });
        $('#benefit p').each(function () {
            const position = $(this).offset().top;
            if (scrollAmount > position - windowHeight + 200) {
                $(this).addClass('slide');
            }
        });
    });

});
