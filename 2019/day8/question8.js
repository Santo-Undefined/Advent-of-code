import { input, pixelated, simpleImage } from "./data.js";
import { part1 } from "./part1.js";
import { part2 } from "./part2.js";

const makeLayers = (pixels, [width, height]) => {
  const pixelCopy = pixels.slice();
  const layers = [];
  let startIndex = 0;
  while (startIndex < pixelCopy.length) {
    const rows = [];
    for (let index = 0; index < height; index++) {
      rows.push(pixelCopy.slice(startIndex, startIndex + width));
      startIndex = startIndex + width;
    }
    layers.push(rows);
  }
  return layers;
};

const main = (encodedData, dimensions) => {
  const imageLayers = makeLayers(encodedData.split(""), dimensions);
  console.log("Part 1", part1(imageLayers));
  console.log("Part 2\n", part2(imageLayers, dimensions));
};

// main(pixelated, [2, 2]);
// main(simpleImage, [3, 2]);
main(input, [25, 6]);
