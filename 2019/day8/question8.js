import { input, pixelated, simpleImage } from "./data.js";
import { part1 } from "./part1.js";
import { part2 } from "./part2.js";

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

const main = (encodedImage, dimensions) => {
  const layeredImage = makeLayers(encodedImage.split(""), dimensions);
  console.log("Part 1", part1(layeredImage));
  console.log("Part 2\n", part2(layeredImage, dimensions));
};

// main(pixelated, [2, 2]);
// main(simpleImage, [3, 2]);
main(input, [25, 6]);
