import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from 'chart.js/auto';

import { options } from './options.js';
import { data } from './data.js';

import { getRGBAColor, setRGBAColor } from '../../utils/changeRGBA.js';
import { Tabs } from '../../views/tabs.js';

export let chartTabsInstance;
export async function doughnutChart() {
  const universityIndicators = new Chart(document.getElementById('university-chart'), {
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

  const $chartTables = document.querySelector('[data-chart-table-box]');

  chartTabsInstance.on('changeTab', (tabId) => {
    if ($chartTables) {
      $chartTables.querySelectorAll(`[data-chart-table]`).forEach(($el) => {
        $el.classList.remove('active');
      });

      $chartTables.querySelector(`[data-chart-table=${tabId}]`).classList.add('active');
    }

    const currentId = data.datasets[0].ids.indexOf(tabId);
    const newColor = setRGBAColor({
      ...getRGBAColor(data.datasets[0].backgroundColor[currentId]),
      opacity: 1,
    });

    const newData = {
      ...data, // Копируем все свойства из исходного объекта data
      datasets: [
        {
          ...data.datasets[0], // Копируем все свойства из первого элемента массива datasets
          backgroundColor: data.datasets[0].backgroundColor.map((color, index) =>
            index === currentId ? newColor : color,
          ),
        },
      ],
    };

    universityIndicators.data = newData;
    universityIndicators.options.animation.duration = 0;

    universityIndicators.update();
  });

  chartTabsInstance.changeControlActive('item-1', true);
}
