import { popover } from './utils.js';
import { ScrollObserver } from './ScrollObserver.js';

export class Header {
  constructor() {
    this.$header = document.querySelector('.header');

    this.headerHeight = this.$header.clientHeight;
    this.previousScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    this.scrollObserver = new ScrollObserver();

    this.init();
  }

  init() {
    this.initListeners();
    popover({
      $mainArray: this.$header.querySelectorAll('.header__menu-linkWrapper'),
      dropdownSelector: '.header__menu-dropdown',
      display: 'flex',
    });
  }

  initListeners() {
    window.addEventListener('scroll', this.checkScrollDirection.bind(this));
  }

  stickyHeader(isScrolled, scrolledPixels = 0) {
    if (scrolledPixels > 100) {
      this.$header.style.top = isScrolled ? `-${this.headerHeight}px` : `0px`;
    } else {
      this.$header.style.top = `0px`;
    }

    this.scrollObserver.notify(isScrolled);
  }

  checkScrollDirection() {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    const scrolledPixels = Math.round(
      document.documentElement.scrollTop || document.body.scrollTop,
    );

    this.stickyHeader(scrolledPixels > this.headerHeight, scrolledPixels);

    if (currentScrollPosition > this.previousScrollPosition) {
      this.stickyHeader(true, scrolledPixels);
    } else {
      this.stickyHeader(false, scrolledPixels);
    }

    this.$header.classList.toggle('scrolled', scrolledPixels > this.headerHeight);
    this.previousScrollPosition = currentScrollPosition;
  }
}
