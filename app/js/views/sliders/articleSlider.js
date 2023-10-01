import Swiper, { Pagination } from 'swiper';

export const articleSlider = new Swiper('.articleSlider', {
  modules: [Pagination],
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: '.articleSlider__pagination',
    type: 'bullets',
    clickable: true,
  },
});
