import { checkPage } from '../utils.js';
import { Aside } from './Aside.js';
import { doughnutChart } from './chart/chart.js';
import { popover } from '../utils.js';

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
  }
};
