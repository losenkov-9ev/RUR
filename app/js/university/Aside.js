import { Header } from '../header.js';

export class Aside extends Header {
  constructor() {
    super();

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
    this.eventListeners();
    // this.observeIntersections();
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

  observeIntersections() {
    // Целевой элемент, который вы хотите отслеживать
    // const targetElement = document.querySelector('.university-item');
    // // Опции для Intersection Observer
    // const options = {
    //   root: null, // Используется viewport как root
    //   rootMargin: '0px', // Отступы от границ root
    //   threshold: 1.0, // Полностью видимый элемент
    // };
    // // Создание Intersection Observer
    // const observer = new IntersectionObserver((entries, observer) => {
    //   entries.forEach((entry) => {
    //     if (entry.isIntersecting) {
    //       // Элемент находится в видимой части экрана (top: 0)
    //       // В этом месте вы можете выполнить необходимые действия
    //       console.log('Элемент на верхней части экрана:', entry.target);
    //     }
    //   });
    // }, options);
    // // Начать наблюдение за элементом
    // observer.observe(targetElement);
  }
}
