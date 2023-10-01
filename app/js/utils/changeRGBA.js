export const getRGBAColor = (str) => {
  const [_, red, green, blue, opacity] = str.match(/(\d+), (\d+), (\d+), (\d+\.\d+)/);

  return {
    red,
    green,
    blue,
    opacity,
  };
};

export const setRGBAColor = ({ red, green, blue, opacity }) =>
  `rgba(${red}, ${green}, ${blue}, ${opacity})`;
