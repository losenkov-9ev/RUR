import { popover } from '../views/popover.js';
import { ScrollObserver } from '../utils/ScrollObserver.js';

export class Header {
  constructor(isCalledByExtendedClass) {
    this.isCalledByExtendedClass = isCalledByExtendedClass;
    this.$header = document.querySelector('.header');

    this.headerHeight = this.$header.clientHeight;
    this.previousScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    this.scrollObserver = new ScrollObserver();

    this.$burger = document.querySelector('[data-burger="open"]');
    this.$headerMobile = document.querySelector('.header__mobile');

    this.init();
  }

  init() {
    this.initListeners();
    !this.isCalledByExtendedClass && this.headerMobileListeners();
    popover({
      $mainArray: this.$header.querySelectorAll('.header__menu-linkWrapper'),
      dropdownSelector: '.header__menu-dropdown',
      display: 'flex',
    });
  }

  initListeners() {
    window.addEventListener('scroll', this.checkScrollDirection.bind(this));
    this.$header.addEventListener('click', (e) => {
      if (e.target.closest('[data-header="close"]')) {
        this.closeMobileHeader();
      }
    });
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

  headerMobileListeners() {
    this.$headerMobile.style.paddingTop = this.headerHeight + 'px';

    this.$burger.addEventListener('click', () => {
      this.$burger.classList.toggle('active');
      this.$headerMobile.classList.toggle('active');

      document.body.classList.toggle('popup-opened');

      setTimeout(() => {
        this.stickyHeader(false);
        this.mobileHeaderShadow();
      }, 20);
    });
    this.$headerMobile.addEventListener('click', (e) => {
      if (e.target.closest('[data-header="close"]')) {
        this.closeMobileHeader();
      }
    });
  }

  closeMobileHeader() {
    this.$burger.classList.remove('active');
    this.$headerMobile.classList.remove('active');

    document.body.classList.remove('popup-opened');

    setTimeout(() => this.mobileHeaderShadow(), 20);
  }

  mobileHeaderShadow() {
    this.$burger.classList.contains('active')
      ? this.$header.classList.remove('scrolled')
      : this.$header.classList.add('scrolled');
  }
}
