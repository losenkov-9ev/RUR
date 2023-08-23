import Chart from 'chart.js/auto';

export async function doughnutChart() {
  // const data = [
  //   { name: 'Teaching ranking', count: 40 },
  //   { name: 'Research ranking', count: 40 },
  //   { name: 'Research ranking', count: 10 },
  //   { name: 'Financial sustainability ranking', count: 10 },
  // ];
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Yellow'],
    datasets: [
      {
        label: 'Research ranking',
        data: [40, 40, 10, 10],
        backgroundColor: [
          '#2B8CD9',
          '#48C1C0',
          'rgba(151, 202, 98, 0.5)',
          'rgba(255, 195, 108, 0.5)',
        ],
        borderRadius: 5,
        offset: 4,
        hoverOffset: 4,
        cutout: 36,
      },
    ],
  };

  new Chart(document.getElementById('acquisitions'), {
    type: 'doughnut',
    data,
    options: {
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            let sum = 0;
            const dataArr = ctx.chart.data.datasets[0].data;
            dataArr.map((data) => {
              sum += data;
            });
            const percentage = ((value * 100) / sum).toFixed(2) + '%';
            return percentage;
          },
          color: '#fff', // Цвет меток
          font: {
            weight: 'bold',
          },
        },
      },
    },
  });
}
