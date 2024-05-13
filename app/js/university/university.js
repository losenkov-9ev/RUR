import { initUniversityGallerySlider, initUniversityMatrialsSlider } from '../views/sliders.js';
import { ProgramsAccordion } from './programsAccordion.js';
import { locationToggler } from './locationToggler.js';
import { checkPage } from '../utils/checkPage.js';
import { DoughnutChart } from './chart/chart.js';

import { Popover } from '../views/popover.js';
import { Aside } from '../views/Aside.js';
import { Tabs } from '../views/tabs.js';

import { Fancybox } from '@fancyapps/ui';
import { pdf } from './pdf.js';

import NiceSelect from '../plugins/nice-select2.js';

export const init = () => {
  pdf();

  document.querySelectorAll('.university-select').forEach(
    ($s, idx) =>
      new NiceSelect($s, {
        placeholder: 'Select',
        searchable: !idx,
      }),
  );

  if (checkPage('university-main-page') || checkPage('university-extended-page')) {
    new DoughnutChart('item-1');
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
