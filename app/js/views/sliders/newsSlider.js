import Swiper, { Navigation } from 'swiper';

export const newsSlider = new Swiper('.newsCards__box', {
  modules: [Navigation],
  spaceBetween: 30,
  navigation: {
    prevEl: '.newsCards__arrow--prev',
    nextEl: '.newsCards__arrow--next',
  },
  breakpoints: {
    991: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 1,
    },
  },
});
