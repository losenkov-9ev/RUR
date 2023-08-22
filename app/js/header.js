import { initSearch } from './search.js';

export function initHeader() {
  // sticky header

  const $header = document.querySelector('.header');
  const headerHeight = $header.clientHeight;

  const $content = document.querySelector('.content');
  const $search = document.querySelector('.search');

  $content.style.paddingTop = $header.clientHeight + 'px';
  $search.style.paddingTop = $header.clientHeight + 'px';

  // Инициализируем переменную для хранения предыдущего значения прокрутки
  let previousScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  // Функция для проверки направления прокрутки
  function checkScrollDirection() {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    const scrolledPixels = Math.round(
      document.documentElement.scrollTop || document.body.scrollTop,
    );
    stickyHeader(scrolledPixels > headerHeight, scrolledPixels);
    currentScrollPosition > previousScrollPosition
      ? stickyHeader(true, scrolledPixels)
      : stickyHeader(false, scrolledPixels);

    scrolledPixels > headerHeight
      ? $header.classList.add('scrolled')
      : $header.classList.remove('scrolled');

    // Обновляем значение предыдущего значения прокрутки
    previousScrollPosition = currentScrollPosition;
  }

  // Добавляем обработчик события прокрутки
  window.addEventListener('scroll', checkScrollDirection);

  $header.querySelectorAll('.header__menu-linkWrapper').forEach(($el) => {
    const $dropdown = $el.querySelector('.header__menu-dropdown');
    $el.addEventListener('mouseenter', function (e) {
      $dropdown.style.display = 'flex';
      setTimeout(() => {
        $dropdown.classList.add('opened');
      }, 0);
    });
    $el.addEventListener('mouseleave', function (e) {
      $dropdown.classList.remove('opened');
      setTimeout(() => {
        $dropdown.style.display = 'none';
      }, 300);
    });
  });

  // mobile header
  // const $burger = document.querySelector('.header__top-burger');
  // const $headerMobile = document.querySelector('.header__mobile');

  // $burger.addEventListener('click', (e) => {
  //   $burger.classList.toggle('active');
  //   $headerMobile.classList.toggle('active');

  //   document.body.classList.toggle('modal-opened');

  //   setTimeout(() => {
  //     stickyHeader(false);
  //     mobileHeaderShadow();
  //   }, 20);
  // });
  // $headerMobile.addEventListener('click', (e) => {
  //   if (e.target.closest('.header__mobile-link')) {
  //     $burger.classList.remove('active');
  //     $headerMobile.classList.remove('active');

  //     document.body.classList.remove('modal-opened');

  //     setTimeout(() => mobileHeaderShadow(), 20);
  //   }
  // });

  // function mobileHeaderShadow() {
  //   $burger.classList.contains('active')
  //     ? $header.classList.remove('scrolled')
  //     : $header.classList.add('scrolled');
  // }

  function stickyHeader(isScrolled, scrolledPixels = 0) {
    if (scrolledPixels > 100) {
      isScrolled ? ($header.style.top = `-${headerHeight}px`) : ($header.style.top = `0px`);
    } else {
      $header.style.top = `0px`;
    }
  }

  initSearch();
}
