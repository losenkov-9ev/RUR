import { data } from '../data.js';
import { chartTabsInstance } from '../chart.js';

export const eventsOptions = {
  onClick: (_, elements) => {
    if (elements.length > 0) {
      const clickedElement = elements[0];
      const datasetIndex = clickedElement.datasetIndex;
      const index = clickedElement.index;

      const clickedElementID = data.datasets[datasetIndex].ids[index];

      // Сделайте выбранный элемент активным (например, измените его цвет)
      elements[0].element.options.offset = 20;
      // const dataset = myChart.data.datasets[clickedElement.datasetIndex];
      // dataset.backgroundColor[clickedElement.index] = 'yellow';

      // // Обновите график, чтобы увидеть изменения
      // update();

      chartTabsInstance.changeControlActive(clickedElementID);
    }
  },
};
