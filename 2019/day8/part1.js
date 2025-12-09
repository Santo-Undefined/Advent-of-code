const findDigitFrequency = (layer) =>
  layer.reduce((res, digit) => {
    res[digit] = res[digit] ? res[digit] + 1 : 1;
    return res;
  }, {});

const combineLayerElements = (layeredImage) =>
  layeredImage.map((x) => x.flatMap((x) => x));

const findDigitFrequencyPerLayer = (layeredImage) => {
  const combinedLayerElements = combineLayerElements(layeredImage);
  const layerDigitFrequency = combinedLayerElements.map(findDigitFrequency);
  return layerDigitFrequency;
};

export const part1 = (layeredImage) => {
  const layerDigitFrequency = findDigitFrequencyPerLayer(layeredImage);
  const fewest0layer = layerDigitFrequency.reduce((res, x) => {
    return x["0"] < res["0"] ? x : res;
  });
  const countOf1s = fewest0layer["1"];
  const countOf2s = fewest0layer["2"];
  return countOf1s * countOf2s;
};
