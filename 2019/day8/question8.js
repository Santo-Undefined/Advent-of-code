import { input, simpleImage } from "./data.js";

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

const makeLayers = (splittedImage, [width, height]) => {
  const imageCopy = splittedImage.slice();
  const layeredImage = [];
  while (imageCopy.length > 0) {
    const layer = [];
    for (let index = 0; index < height; index++) {
      layer.push(imageCopy.splice(0, width));
    }
    layeredImage.push(layer);
  }
  return layeredImage;
};

const part1 = (layerDigitFrequency) => {
  const fewest0layer = layerDigitFrequency.reduce((res, x) => {
    return x["0"] < res["0"] ? x : res;
  });
  const countOf1s = fewest0layer["1"];
  const countOf2s = fewest0layer["2"];
  return countOf1s * countOf2s;
};

const main = (encodedImage, dimensions) => {
  const splittedImage = encodedImage.split("");
  const layeredImage = makeLayers(splittedImage, dimensions);
  const layerDigitFrequency = findDigitFrequencyPerLayer(layeredImage);

  console.log(part1(layerDigitFrequency));
};

// main(simpleImage, [3, 2]);
main(input, [25, 6]);
