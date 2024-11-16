// 섹션 1
const sect_01_swiper = new Swiper('.sect_01 .swiper-container', {
    slidesPerView: 1,
    pagination: {
        el: '.sect_01 .swiper-pagination',
        clickable: true,
    },
    simulateTouch: true,
    allowTouchMove: true,
});

// 섹션 6
const sect_06_swiper = new Swiper('.sect_06 .visual_popup .swiper-container', {
    navigation: {
        nextEl: '.sect_06 .swiper-button-next',
        prevEl: '.sect_06 .swiper-button-prev',
    },
});

// 섹션 8
const sect_08_swiper = new Swiper('.sect_08 .swiper-container', {
    slidesPerView: 4.1,
    spaceBetween: 10,
    navigation: {
        nextEl: '.sect_08 .button_wrap .swiper-button-next',
        prevEl: '.sect_08 .button_wrap .swiper-button-prev',
    },
});