import Swiper from 'swiper';
import { Pagination, EffectFade, Autoplay, Navigation } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    initSwiper('.swiper-f', {
        speed: 1000,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });

    initSwiper('.swiper-s', {
        speed: 800,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        navigation: {
            nextEl: '.swiper-next',
        }
    });
});

const initSwiper = (selector, options = {}) => {
    const container = document.querySelector(selector);
    if (!container) return;

    return new Swiper(container, {
        modules: [Pagination, EffectFade, Autoplay, Navigation],
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        loop: true,
        grabCursor: true,
        ...options
    });
}