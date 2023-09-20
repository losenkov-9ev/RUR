import { checkPage } from '../utils.js';
import { Aside } from '../Aside.js';
import { doughnutChart } from './chart/chart.js';
import { popover } from '../utils.js';
import { Fancybox } from '@fancyapps/ui';
import { initUniversityGallerySlider, initUniversityMatrialsSlider } from '../sliders.js';
import { ProgramsAccordion } from './programsAccordion.js';
import { Tabs } from '../tabs.js';

export const initUniversity = () => {
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

    new ProgramsAccordion();
    new Tabs({
      controlsSelector: '[data-programs-controls="wrapper"]',
      tabsSelector: '[data-programs-tabs]',
      controlsItem: 'data-programs-controls',
      tabItem: 'data-programs-tab',
      defaultTabId: 'item-1',
      activeClass: 'active',
      defaultDisplay: 'block',
    });
  }

  const $location = document.querySelector('#universityLocation');
  const $locationItems = $location.querySelectorAll('[data-location="item"]');
  const $locationBox = $location.querySelector('[data-location="box"]');

  let $locationHeight = 0;

  if ($locationItems.length >= 3) {
    $locationHeight = [...$locationItems].reduce((acc, $item, idx) => {
      return idx < 3 ? (acc += $item.offsetHeight) : acc;
    }, 0);

    $locationBox.style.height = $locationHeight + 'px';
  }

  $location.addEventListener('click', (e) => {
    const $target = e.target.closest('[data-location="button"]');

    if ($target) {
      e.preventDefault();

      const $elText = $target.querySelector('span');

      $locationBox.classList.toggle('opened');
      $target.classList.toggle('opened');

      const clone = $locationBox.cloneNode(true);
      clone.style.overflow = 'visible';
      clone.style.height = 'auto';
      clone.style.visibility = 'hidden'; // чтобы избежать мигания

      // Вставляем клон в DOM, чтобы он занял свое место в потоке документа (но он не будет видимым)
      $locationBox.parentNode.appendChild(clone);

      // Получаем высоту текста внутри клонированного элемента
      const textHeight = clone.getBoundingClientRect().height;

      // Удаляем клон из DOM, так как он больше не нужен
      clone.parentNode.removeChild(clone);

      if ($locationBox.classList.contains('opened')) {
        $elText.innerHTML = 'Hide';
        $locationBox.style.height = textHeight + 'px';
      } else {
        $elText.innerHTML = 'Watch more';
        $locationBox.style.height = $locationHeight + 'px';
      }
    }
  });

  new Aside();
};
