const makeFrame = ([width, height]) => {
  const frame = [];
  for (let index = 0; index < height; index++) {
    frame.push(" ".repeat(width).split(""));
  }
  return frame;
};

const joinFrame = (frame) => frame.map((x) => x.join("")).join("\n");

const mapToFrame = (frame, layer) => {
  const pixels = {
    0: "□",
    1: "■",
  };

  for (let height = 0; height < frame.length; height++) {
    for (let width = 0; width < frame[height].length; width++) {
      const digit = layer[height][width];
      if (digit !== "2") {
        frame[height][width] = pixels[digit];
      }
    }
  }
};

export const part2 = (layeredImage, dimensions) => {
  const frame = makeFrame(dimensions);

  for (let index = layeredImage.length - 1; index >= 0; index--) {
    mapToFrame(frame, layeredImage[index]);
  }
  return joinFrame(frame);
};
