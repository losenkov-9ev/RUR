import { Header } from './header.js';

export class Aside extends Header {
  constructor(withMenu = true) {
    super();

    this.withMenu = withMenu;

    this.$wrapper = document.querySelector('[data-aside="wrapper"]');
    this.$content = this.$wrapper.querySelector('[data-aside="content"]');
    this.$aside = this.$wrapper.querySelector('[data-aside="block"]');

    this.asideHeight = this.$aside.clientHeight;
    this.contentHeight = this.$content.clientHeight;

    this.scrollObserver.subscribe(this.headerToggleEvent.bind(this));
    this.topMargin = 20;

    this.initAside();
  }

  initAside() {
    this.$content.style.minHeight = this.contentHeight + 'px';
    this.$aside.style.height = this.asideHeight + 'px';

    this.changeAsidePosition(this.topMargin);
    this.withMenu && this.eventListeners();
  }

  headerToggleEvent(isScrolled) {
    !isScrolled
      ? this.changeAsidePosition(this.topMargin + this.headerHeight)
      : this.changeAsidePosition(this.topMargin);
  }

  changeAsidePosition(value) {
    this.$aside.style.top = value + 'px';
  }

  eventListeners() {
    this.$aside.addEventListener('click', (e) => {
      const $target = e.target.closest('[data-aside="link"]');
      if ($target) {
        e.preventDefault();
        this.goToSection($target.getAttribute('href'));
      }
    });
  }

  goToSection(href) {
    const elPosition = this.$content.querySelector(href).offsetTop;

    window.scrollTo({
      top: elPosition - this.headerHeight - this.topMargin,
      behavior: 'smooth',
    });
  }
}
