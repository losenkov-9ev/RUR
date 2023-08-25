export const tooltipOptions = {
  backgroundColor: '#fff',
  cornerRadius: 8,
  displayColors: false,
  caretSize: 6,

  titleColor: '#212B36',
  titleAlign: 'center',
  titleMarginBottom: 0,
  titleFont: {
    weight: 'bold',
    family: 'Inter',
    size: 14,
    lineHeight: 1.2,
  },

  bodyAlign: 'center',
  bodyFont: {
    weight: 'bold',
    family: 'Inter',
    size: 15,
    lineHeight: 1.8,
  },
  padding: {
    left: 12,
    right: 12,
    top: 10,
    bottom: 10,
  },

  callbacks: {
    labelColor: function (context) {
      return {
        opacity: 0,
      };
    },
    labelTextColor: function (context) {
      const elIndex = context.dataIndex;
      const color = context.dataset.backgroundColor[elIndex];

      return color;
    },
    label: function (context) {
      let label = context.formattedValue;
      return label + '%';
    },
  },
};
