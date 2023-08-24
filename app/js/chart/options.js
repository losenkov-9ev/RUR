import { datalablesOptions } from './options/datalablesOption.js';
import { eventsOptions } from './options/eventsOptions.js';
import { legendOptions } from './options/legendOptions.js';
import { tooltipOptions } from './options/tooltipOptions.js';

export const options = {
  ...eventsOptions,
  plugins: {
    legend: legendOptions,
    tooltip: tooltipOptions,
    datalabels: datalablesOptions,
  },
};
