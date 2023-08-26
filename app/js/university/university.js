import { checkPage } from '../utils.js';
import { Aside } from './Aside.js';
import { doughnutChart } from './chart/chart.js';
import { popover } from '../utils.js';
import { Fancybox } from '@fancyapps/ui';
import { initUniversityGallerySlider, initUniversityMatrialsSlider } from '../sliders.js';

export const initUniversity = () => {
  new Aside();

  if (checkPage('university-main-page') || checkPage('university-extended-page')) {
    doughnutChart();
    const $rankings = document.querySelector('[data-university="rankings"]');
    popover({
      $mainArray: $rankings.querySelectorAll(
        '.universityRankings__row:not(.universityRankings__row--head)',
      ),
      dropdownSelector: '.universityRankings__popover',
    });
  }
  if (checkPage('university-extended-page')) {
    Fancybox.bind('[data-fancybox]', {});
    initUniversityMatrialsSlider;
    initUniversityGallerySlider;
    function programsAccordion() {
      const $wrapper = document.querySelector('.universityPrograms__box');

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

              $content.style.maxHeight = $content.style.maxHeight
                ? null
                : $content.scrollHeight + 'px';

              $topBox.style.maxHeight = $topBox.scrollHeight + 'px';
            });
          });
        });
    }
    programsAccordion();
  }
};
