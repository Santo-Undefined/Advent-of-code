// const spaceMap = Deno.readTextFileSync("./smallData.txt");
const spaceMap = Deno.readTextFileSync("./bigData.txt");

const makePlantConnections = (spaceMap) =>
  spaceMap.split("\n").reduce((res, x) => {
    const [planet, satellite] = x.split(")");
    res[satellite] = planet ;
    return res;
  },{});

const countOrbits = (curretPlanet, plantConnections) => {
  let orbits = 0;
  let planet = curretPlanet;
  while (planet !== "COM") {
    planet = plantConnections[planet];
    orbits++;
  }
  return orbits
}

const main = (spaceMap) => {
  const plantConnections = makePlantConnections(spaceMap);
  let totalOrbitCount = 0;
  for (const planet in plantConnections) {
    totalOrbitCount += countOrbits(planet,plantConnections)
  };
  console.log(totalOrbitCount)
};

main(spaceMap);