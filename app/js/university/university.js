import { checkPage } from '../utils.js';
import { Aside } from './Aside.js';
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

  new Aside();
};
