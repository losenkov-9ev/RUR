import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { options } from './options.js';
import { data } from './data.js';

export async function doughnutChart() {
  new Chart(document.getElementById('university-chart'), {
    type: 'doughnut',
    data,
    options,
    plugins: [ChartDataLabels],
  });
}
