import { datalablesOptions } from './options/datalablesOption.js';
import { tooltipOptions } from './options/tooltipOptions.js';
import { eventsOptions } from './options/eventsOptions.js';
import { legendOptions } from './options/legendOptions.js';

export const options = {
  ...eventsOptions,
  animation: {
    duration: 1000,
  },
  plugins: {
    legend: legendOptions,
    tooltip: tooltipOptions,
    datalabels: datalablesOptions,
  },
};
