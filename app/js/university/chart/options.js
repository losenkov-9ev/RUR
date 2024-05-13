import { datalablesOptions } from './options/datalablesOption.js';
import { tooltipOptions } from './options/tooltipOptions.js';
import { legendOptions } from './options/legendOptions.js';

export const options = {
  animation: {
    duration: 1000,
  },
  plugins: {
    legend: legendOptions,
    tooltip: tooltipOptions,
    datalabels: datalablesOptions,
  },
};
