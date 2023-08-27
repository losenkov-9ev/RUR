export class ProgramsAccordion {
  constructor() {
    this.$wrapper = document.querySelector('.universityPrograms');
    this.$controls = this.$wrapper.querySelectorAll('[data-programs-controls]');
    this.$items = this.$wrapper.querySelectorAll('[data-programs-items]');

    this.mainItemSelector = '.universityPrograms__item:not(.universityPrograms__item--subitem)';
    this.$mainItems = this.$wrapper.querySelectorAll(this.mainItemSelector);

    this.init();
  }

  init() {
    this.setupAccordion();
  }

  setupAccordion() {
    this.$wrapper.addEventListener('click', (event) => {
      const $targetMain = event.target.closest('.universityPrograms__item-head.main');
      const $targetSub = event.target.closest('.universityPrograms__item-head.sub');

      if ($targetMain) {
        this.toggleAccordionItem($targetMain);
      }

      if ($targetSub) {
        this.toggleSubAccordionItem($targetSub);
      }
    });
  }

  toggleAccordionItem($target) {
    const $item = $target.closest('.universityPrograms__item');
    const $topBox = $target.nextElementSibling;
    $item.classList.toggle('opened');
    $topBox.style.maxHeight = $item.classList.contains('opened') ? $topBox.scrollHeight + 'px' : 0;
  }

  toggleSubAccordionItem($target) {
    const $el = $target;
    const $item = $el.closest(this.mainItemSelector);
    const $content = $el.nextElementSibling;
    const $topBox = $item.querySelector('.universityPrograms__item-head.main').nextElementSibling;

    $el.parentNode.classList.toggle('opened');
    $el.classList.toggle('opened');
    $content.style.maxHeight = $el.classList.contains('opened') ? $content.scrollHeight + 'px' : 0;

    $el.classList.contains('opened')
      ? setTimeout(() => {
          $topBox.style.maxHeight = $topBox.scrollHeight + 'px';
        }, 300)
      : ($topBox.style.maxHeight = $topBox.scrollHeight + 'px');
  }
}
