const calcPaperNeeded = (dimension) => {
  dimension.push(dimension[0]);
  const sides = [];
  for (let index = 0; index < dimension.length - 1; index++) {
    sides.push(dimension[index] * dimension[index + 1]);
  }
  const smallestSide = Math.min(...sides);
  return smallestSide + (2 * sides.reduce((res, x) => res + x));
};

// const calcWappingPaper = (input) => {
//   const dimensions = input.match(/\d+x\d+x\d+/g);
//   let paper = 0;
//   for (const dimension of dimensions) {
//     const values = dimension.split("x").map((x) => parseInt(x));
//     paper += calcPaperNeeded(values);
//   }
//   console.log("Final", paper);
// };

const calcRibbon = (dimension) => {
  dimension.push(dimension[0]);
  const perimeter = [];
  for (let index = 0; index < dimension.length - 1; index++) {
    perimeter.push((dimension[index] + dimension[index + 1]) * 2);
  }
  const smallestPerimeter = Math.min(...perimeter);
  return smallestPerimeter + (dimension[0] * dimension[1] * dimension[2]);
};

// const ribbonNeeded = (input) => {
//   const dimensions = input.match(/\d+x\d+x\d+/g);
//   let ribbon = 0;
//   for (const dimension of dimensions) {
//     const values = dimension.split("x").map((x) => parseInt(x));
//     ribbon += calcRibbon(values);
//   }
//   console.log("Final", ribbon);
// };

const calcMaterial = (input, material) => {
  const dimensions = input.match(/\d+x\d+x\d+/g);
  let quantity = 0;
  for (const dimension of dimensions) {
    const values = dimension.split("x").map((x) => parseInt(x));
    quantity += material(values);
  }
  console.log("Final", quantity);
};

// calcWappingPaper("4x23x21\n22x29x19\n11x4x11\n8x10x5\n24x18x16")
// calcWappingPaper("1x1x10") // 43
// calcWappingPaper("2x3x4")  // 58
// calcWappingPaper("1x1x10\n2x3x4")  // 101
// calcWappingPaper(Deno.readTextFileSync("./input.txt"))

// ribbonNeeded("1x1x10"); // 14
// ribbonNeeded("2x3x4"); // 34
// ribbonNeeded("1x1x10\n2x3x4"); // 48
// ribbonNeeded(Deno.readTextFileSync("./input.txt"));

calcMaterial("1x1x10", calcPaperNeeded)
calcMaterial("1x1x10", calcRibbon)
