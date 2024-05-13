import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from 'chart.js/auto';

import { data } from './data.js';
import { options } from './options.js';

import { Tabs } from '../../views/tabs.js';
import { tabsOptions } from './options/tabsOptions.js';

import { getRGBAColor, setRGBAColor } from '../../utils/changeRGBA.js';

export class DoughnutChart {
  constructor(tabId) {
    this.tabId = tabId;
    this.$chartTables = document.querySelector('[data-chart-table-box]');

    this.init();
  }

  init = () => {
    this.chartTabsInstance = this.initializeTabs();
    this.chartInstance = this.initializeChart();

    this.chartTabsInstance.changeControlActive(this.tabId, true);
  };

  initializeTabs = () => {
    const chartTabsInstance = new Tabs(tabsOptions(this.tabId));
    chartTabsInstance.on('changeTab', this.handleChangeTab);

    return chartTabsInstance;
  };

  initializeChart = () =>
    new Chart(document.getElementById(`university-chart-${this.tabId}`), {
      type: 'doughnut',
      data,
      options: {
        ...options,
        onClick: this.handleChartClick,
      },
      plugins: [ChartDataLabels],
    });

  handleChangeTab = (tabId) => {
    this.updateTableVisibility(tabId);
    this.updateChartData(tabId);
  };

  updateTableVisibility = (tabId) => {
    if (!this.$chartTables) return;
    const chartTableItems = this.$chartTables.querySelectorAll('[data-chart-table]');
    chartTableItems.forEach(($el) =>
      this.toggleActiveClass($el, $el.getAttribute('data-chart-table') === tabId),
    );
  };

  toggleActiveClass = (element, isActive) => {
    element.classList.toggle('active', isActive);
  };

  updateChartData = (tabId) => {
    const currentId = data.datasets[0].ids.indexOf(tabId);
    const newColor = this.getNewColor(currentId);
    const newData = this.getUpdatedData(newColor, currentId);
    this.updateChartInstance(newData);
  };

  getNewColor = (currentId) => {
    return setRGBAColor({
      ...getRGBAColor(data.datasets[0].backgroundColor[currentId]),
      opacity: 1,
    });
  };

  getUpdatedData = (newColor, currentId) => ({
    ...data,
    datasets: [
      {
        ...data.datasets[0],
        backgroundColor: data.datasets[0].backgroundColor.map((color, index) =>
          index === currentId ? newColor : color,
        ),
      },
    ],
  });

  updateChartInstance = (newData) => {
    this.chartInstance.data = newData;
    this.chartInstance.options.animation.duration = 0;

    this.chartInstance.update();
  };

  handleChartClick = (_, elements) => {
    if (elements.length > 0) {
      const clickedElement = elements[0];
      const datasetIndex = clickedElement.datasetIndex;
      const index = clickedElement.index;
      const clickedElementID = data.datasets[datasetIndex].ids[index];

      this.chartTabsInstance.changeControlActive(clickedElementID);
    }
  };
}
