// mobile header

const $burger = document.querySelector('.header__top-burger');
const $headerMobile = document.querySelector('.header__mobile');

$burger.addEventListener('click', (e) => {
  $burger.classList.toggle('active');
  $headerMobile.classList.toggle('active');

  document.body.classList.toggle('modal-opened');

  setTimeout(() => {
    stickyHeader(false);
    mobileHeaderShadow();
  }, 20);
});
$headerMobile.addEventListener('click', (e) => {
  if (e.target.closest('.header__mobile-link')) {
    $burger.classList.remove('active');
    $headerMobile.classList.remove('active');

    document.body.classList.remove('modal-opened');

    setTimeout(() => mobileHeaderShadow(), 20);
  }
});

function mobileHeaderShadow() {
  $burger.classList.contains('active')
    ? $header.classList.remove('scrolled')
    : $header.classList.add('scrolled');
}

export function programsAccordion() {
  const $wrapper = document.querySelector('.universityPrograms');
  $wrapper.addEventListener('click', (e) => {
    const $target = e.target.closest('[data-programs-controls]');

    if ($target) {
      $wrapper.querySelectorAll('[data-programs-controls]').forEach(($t) => {
        $t.classList.add('d-button-disabled');
      });
      $target.classList.remove('d-button-disabled');

      $wrapper.querySelectorAll('[data-programs-items]').forEach(($t) => {
        $t.classList.remove('active');
        setTimeout(() => {
          $t.style.display = 'none';

          const $activeTab = $wrapper.querySelector(
            `[data-programs-items=${$target.dataset.programsControls}]`,
          );

          $activeTab.style.display = 'block';
          setTimeout(() => {
            $activeTab.classList.add('active');
          }, 100);
        }, 300);
      });
    }
  });
  $wrapper
    .querySelectorAll('.universityPrograms__item:not(.universityPrograms__item--subitem)')
    .forEach(($item) => {
      const $targetMain = $item.querySelector('.universityPrograms__item-head.main');
      const $targetSub = $item.querySelectorAll('.universityPrograms__item-head.sub');

      let $topBox;
      $targetMain.addEventListener('click', (e) => {
        $targetMain.closest('.universityPrograms__item').classList.toggle('opened');
        $topBox = $targetMain.nextElementSibling;
        $topBox.style.maxHeight = $topBox.style.maxHeight ? null : $topBox.scrollHeight + 'px';
      });
      $targetSub.forEach(($el) => {
        $el.addEventListener('click', (e) => {
          $el.closest('.universityPrograms__item').classList.toggle('opened');
          const $content = $el.nextElementSibling;

          $content.style.maxHeight = $content.style.maxHeight ? null : $content.scrollHeight + 'px';

          $topBox.style.maxHeight = $topBox.scrollHeight + 'px';
        });
      });
    });
}
