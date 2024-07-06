$(document).ready(function () {
        new WOW({
            animateClass: 'animate__animated',
        }).init();

        const carousel = $('.carousel');
        const menu = $('#menu');
        const popup = $('#popup');
        const houseCard = $('.house__image-link');
        const moreProjects = $('#more-houses');
        const technologiesPointers = $('.technologies__pointer');
        const technologiesDescriptions = $('.technologies__description');
        const phone = $('.phone-input');
        const orderForm = $('#order-form');
        const popupForm = $('#popup-form');

        carousel.slick({
            infinite: true,
            centerMode: true,
            centerPadding: 0,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: true,
            responsive: [
                {
                    breakpoint: 851,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        centerMode: false,
                        centerPadding: 180
                    }
                },
                {
                    breakpoint: 601,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false
                    }
                }
            ]
        });

        $('#menu-icon').on('click', () => {
            menu.addClass('menu_open');
            $('body').addClass('modal-open');
        });
        $('#menu *').each(function () {
            $(this).on('click', () => {
                menu.removeClass('menu_open');
                $('body').removeClass('modal-open')
            });
        });

        $('#excursion-button').on('click', () => {
            popup.addClass('popup_open');
            $('body').addClass('modal-open');
        });

        $('#popup-close').on('click', () => {
            popup.removeClass('popup_open');
            $('body').removeClass('modal-open')
        });

        $('a[href^="#"]').on('click', function () {

            const href = $(this).attr('href');

            $('html, body').animate({
                scrollTop: $(href).offset().top
            }, {
                duration: 450,   // по умолчанию «400»
                easing: "linear" // по умолчанию «swing»
            });
            return false;
        });

        houseCard.magnificPopup({
            type: 'image',

            //С этим кодом выезжают плавно
            mainClass: 'mfp-with-zoom', // class to remove default margin from left and right side
            zoom: {
                enabled: true,
                duration: 300 // don't foget to change the duration also in CSS
            }
        });

        $('.download-button').on('click', function () {
            const buttonClass = $(this).attr('class');
            const houseNumber = buttonClass.slice(-3);
            const link = document.createElement('a');
            link.setAttribute('href', `src/files/house-${houseNumber}_plan.pdf`);
            link.setAttribute('download', `src/files/house-${houseNumber}_plan.pdf`);
            link.click();
        });

        $('.guarantee__button').on('click', function () {
            const link = document.createElement('a');
            link.setAttribute('href', `src/files/contract.pdf`);
            link.setAttribute('download', `src/files/contract.pdf`);
            link.click();
        });

        moreProjects.on('click', () => {
            $('.houses__items .house').each(function () {
                $(this).removeClass('house_hidden');
            });
            moreProjects.addClass('houses__more-button_hidden');
        });

        $(document).on('click', (event) => {// событие клика по веб-документу
            const even = (element) => element.contains(event.target);

            if (!technologiesPointers.toArray().some(even) && !technologiesDescriptions.toArray().some(even)) {
                technologiesDescriptions.hide();
            }
        });

        function showTechnologiesDescription() {
            if ($(window).width() <= 1250) {
                technologiesPointers.each(function () {
                    $(this).on('click', () => {
                        technologiesDescriptions.hide();
                        $(this).next().show();
                    });
                });
            } else {
                technologiesDescriptions.show();
            }
        }

        $(window).on('load resize', showTechnologiesDescription);

        phone.inputmask({"mask": "+999(99)99-99-999"});

        function handleSubmit(form) {
            form.on('submit', event => {
                event.preventDefault();

                const name = form.find('.name-input');
                const phone = form.find('.phone-input');
                const checkbox = form.find('.form__checkbox');
                const checkboxUI = form.find('.form__checkbox-ui');
                const successMessage = form.next();

                let hasError = false;
                const loader = $('.loader');
                $('.error-input').hide();
                name.css('border-color', '#fff');
                phone.css('border-color', '#fff');
                checkboxUI.addClass('form__checkbox-border');
                checkboxUI.removeClass('form__checkbox-border_error');

                if (!name.val()) {
                    name.css('border-color', '#ff0000');
                    name.next().show();
                    hasError = true;
                }
                if (!phone.val()) {
                    phone.css('border-color', '#ff0000');
                    phone.next().show();
                    hasError = true;
                }
                if (!checkbox.is(':checked')) {
                    checkboxUI.removeClass('form__checkbox-border');
                    checkboxUI.addClass('form__checkbox-border_error');
                    form.find('.form__checkbox-label').next().show();
                    hasError = true;
                }

                if (!hasError) {
                    // успешный запрос, если в поле name пишем itlogia
                    loader.css('display', 'flex');

                    $.ajax({
                        method: "POST",
                        url: 'https://testologia.site/checkout',
                        data: {name: name.val(), phone: phone.val(), checkbox: checkbox.val()}
                    })
                        .done(function (message) {
                            loader.hide();
                            if (message.success) {
                                successMessage.css('display', 'flex');
                                form.hide();
                            } else {
                                alert('Возникла ошибка, попробуйте ещё раз или позвоните нам');
                            }
                        });
                }
            });
        }

        handleSubmit(orderForm);
        handleSubmit(popupForm);
    }
)
;


