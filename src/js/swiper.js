import Swiper from 'swiper';
import {Pagination, EffectFade, Autoplay} from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    initSwiper('.swiper-f');
});

function initSwiper(selector, options = {}) {
    const container = document.querySelector(selector);
    if (!container) return;

    return new Swiper(container, {
        modules: [Pagination, EffectFade, Autoplay],
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 700,
        grabCursor: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: true
        },
        ...options
    });
}
