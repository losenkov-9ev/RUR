import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { options } from './options.js';
import { data } from './data.js';

import { Tabs } from '../../tabs.js';

export let chartTabsInstance;
export async function doughnutChart() {
  new Chart(document.getElementById('university-chart'), {
    type: 'doughnut',
    data,
    options,
    plugins: [ChartDataLabels],
  });

  chartTabsInstance = new Tabs({
    controlsSelector: '[data-chart-controls="wrapper"]',
    tabsSelector: '[data-chart-tabs]',
    controlsItem: 'data-chart-controls',
    tabItem: 'data-chart-tab',
    defaultTabId: 'item-1',
    activeClass: 'active',
    defaultDisplay: 'block',
  });
}
