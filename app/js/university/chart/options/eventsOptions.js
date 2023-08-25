import { data } from '../data.js';
import { chartTabsInstance } from '../chart.js';

export const eventsOptions = {
  onClick: (event, elements) => {
    if (elements.length > 0) {
      const clickedElement = elements[0];
      const datasetIndex = clickedElement.datasetIndex;
      const index = clickedElement.index;

      const clickedElementID = data.datasets[datasetIndex].ids[index];

      chartTabsInstance.changeControlActive(clickedElementID);
    }
  },
};
