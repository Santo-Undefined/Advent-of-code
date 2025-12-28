const part1 = (directions) => {
  const visitedLocations = ["0,0"];
  let x = 0;
  let y = 0;
  for (const direction of directions) {
    if (direction === ">") ++x;
    if (direction === "<") --x;
    if (direction === "^") ++y;
    if (direction === "v") --y;

    const location = [x, y] + "";
    if (!visitedLocations.includes(location)) visitedLocations.push(location);
  }
  console.log("visited houses", visitedLocations.length);
};

const part2 = (directions) => {
  const visitedLocations = ["0,0"];
  const x = [0,0];
  const y = [0,0];
  for (let index = 0; index < directions.length; index++) {
    const direction = directions[index]
    const deliveryBy = index & 1 ;
    if (direction === ">") ++x[deliveryBy];
    if (direction === "<") --x[deliveryBy];
    if (direction === "^") ++y[deliveryBy];
    if (direction === "v") --y[deliveryBy];

    const location = [x[deliveryBy], y[deliveryBy]] + "";
    if (!visitedLocations.includes(location)) visitedLocations.push(location);
  }
  console.log("visited houses with 2 people", visitedLocations.length);
}

const main = (input) => {
  const directions = input;
  part1(directions);
  part2(directions);

};

main(">");
main("^>v<");
main("^v^v^v^v^v");
main(Deno.readTextFileSync("./input.txt"));
