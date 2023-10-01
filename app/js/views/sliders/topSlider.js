import Swiper, { Navigation, Pagination } from 'swiper';

export const topSliderFn = () => {
  const topSlider = new Swiper('.top__info-slider', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      prevEl: '.top__info-slider-arrowPrev',
      nextEl: '.top__info-slider-arrowNext',
    },
    pagination: {
      type: 'bullets',
      el: '.top__info-slider__dots',
      clickable: true,
    },
  });

  const $topSliderInfo = document.querySelector('[data-university-info="main"]');
  const $topSliderInfoItems = $topSliderInfo.querySelectorAll('[data-university-info]');

  topSlider.on('slideChange', (e) => {
    const $currentSlideInfo = e.slides[e.activeIndex].querySelector(
      '[data-university-info="wrapper"]',
    );
    const $currentSlideInfoItems = $currentSlideInfo.querySelectorAll('[data-university-info]');

    $topSliderInfoItems.forEach(($el, index) => {
      $el.style.opacity = 0;
      setTimeout(() => {
        $el.tagName !== 'IMG'
          ? ($el.innerHTML = $currentSlideInfoItems[index].innerHTML)
          : $el.setAttribute('src', $currentSlideInfoItems[index].getAttribute('src'));

        $el.style.opacity = 1;
      }, 200);
    });
  });
};
