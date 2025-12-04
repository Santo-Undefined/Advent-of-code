const spaceMap = Deno.readTextFileSync("./smallData.txt");

const makePlantConnections = (spaceMap) =>
  spaceMap.split("\n").reduce((res, x) => {
    const [planet, satellite] = x.split(")");
    res[satellite] = planet ;
    return res;
  },{});

// const makePlantConnections = (spaceMap) =>
//   spaceMap.split("\n").map((x) => {
//     const [planet, satellite] = x.split(")");
//     return { [satellite]: planet };
//   });

// const countOrbits = (curretPlanet, plantConnections) => {
//   let orbits = 0;
//   let planet = curretPlanet;
//   while (planet !== "COM") {
//     planet = plantConnections[planet];
//     orbits++;
//   }
// }

const main = (spaceMap) => {
  const plantConnections = makePlantConnections(spaceMap);
  console.log(spaceMap.split("\n"))
  console.log(plantConnections)
};

main(spaceMap);