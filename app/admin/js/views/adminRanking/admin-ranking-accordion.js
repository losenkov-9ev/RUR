export class AdminRankingAccordion {
  constructor() {
    document.addEventListener('click', this.handleClick);
  }

  toggleAccordion = ($item) => {
    if (!$item) return;

    const $body = $item.querySelector('.rankingDataItem__wrapper');
    if (!$body) return;

    $item.classList.toggle('opened');
    $body.style.maxHeight = $item.classList.contains('opened') ? `${$body.scrollHeight}px` : '0';
  };

  scrollToItem = ($item) => {
    if (!$item) return;

    window.scrollTo({
      top: $item.offsetTop - 110,
      behavior: 'smooth',
    });
  };

  handleClick = (e) => {
    const $target = e.target.closest('.rankingDataItem__head');
    if ($target) {
      const $item = $target.closest('.rankingDataItem');
      this.toggleAccordion($item);
    }

    const $button = e.target.closest('.rankingDataItem__button');
    if ($button) {
      const $currentItem = $button.closest('.rankingDataItem');
      const $nextItem =
        $currentItem.nextElementSibling || document.querySelector('.rankingDataItem');

      this.toggleAccordion($currentItem);
      this.toggleAccordion($nextItem);

      setTimeout(() => this.scrollToItem($nextItem), 300);
    }
  };
}
