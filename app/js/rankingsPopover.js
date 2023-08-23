// Вынести как отдельную утилиту и использовать также для header'a

export const rankingsPopover = () => {
  const $rankings = document.querySelector('[data-university="rankings"]');

  $rankings
    .querySelectorAll('.universityRankings__row:not(.universityRankings__row--head)')
    .forEach(($el) => {
      const $dropdown = $el.querySelector('.universityRankings__popover');
      console.log($dropdown);

      $el.addEventListener('mouseenter', function (e) {
        $dropdown.style.display = 'block';
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
};
