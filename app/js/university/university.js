import { initUniversityGallerySlider, initUniversityMatrialsSlider } from '../views/sliders.js';
import { ProgramsAccordion } from './programsAccordion.js';
import { locationToggler } from './locationToggler.js';
import { checkPage } from '../utils/checkPage.js';
import { doughnutChart } from './chart/chart.js';

import { Popover } from '../views/popover.js';
import { Aside } from '../views/Aside.js';
import { Tabs } from '../views/tabs.js';

import { Fancybox } from '@fancyapps/ui';

export const init = () => {
  if (checkPage('university-main-page') || checkPage('university-extended-page')) {
    doughnutChart();
    const $rankings = document.querySelector('[data-university="rankings"]');

    new Popover({
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

  locationToggler();
  new Aside();
};
