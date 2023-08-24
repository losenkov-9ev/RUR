export const datalablesOptions = {
  formatter: (value, ctx) => {
    let sum = 0;
    const dataArr = ctx.chart.data.datasets[0].data;
    dataArr.map((data) => {
      sum += data;
    });
    const percentage = ((value * 100) / sum).toFixed(0);
    return percentage > 20 ? percentage + '%' : '';
  },
  color: '#FDFDFD', // Цвет меток
  font: {
    family: 'Inter',
    weight: 'bold',
    size: 18,
  },
};
