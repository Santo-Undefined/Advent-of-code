// const spaceMap = Deno.readTextFileSync("./smallData.txt");
const spaceMap = Deno.readTextFileSync("./bigData.txt");

const makePlantConnections = (spaceMap) =>
  spaceMap.split("\n").reduce((res, x) => {
    const [planet, satellite] = x.split(")");
    res[satellite] = planet;
    return res;
  }, {});

const countOrbits = (curretPlanet, plantConnections, target = "COM") => {
  let orbits = 0;
  let planet = curretPlanet;
  while (planet !== target) {
    planet = plantConnections[planet];
    orbits++;
  }
  return orbits;
};

const plotPath = (currentPos, plantConnections) => {
  const path = [];
  let planet = currentPos;
  while (planet !== "COM") {
    planet = plantConnections[planet];
    path.push(planet);
  }
  return path;
};

const findPathmeet = (youPath, sanPath) => {
  for (let index = 0; index < youPath.length; index++) {
    if (sanPath.includes(youPath[index])) return youPath[index];
  }
};

const main = (spaceMap) => {
  const plantConnections = makePlantConnections(spaceMap);
  let totalOrbitCount = 0;
  for (const planet in plantConnections) {
    totalOrbitCount += countOrbits(planet, plantConnections);
  }

  const youPath = plotPath("YOU", plantConnections);
  const sanPath = plotPath("SAN", plantConnections);
  const pathMeet = findPathmeet(youPath, sanPath);

  const orbitChanges = youPath.indexOf(pathMeet) + sanPath.indexOf(pathMeet);
  return { totalOrbitCount, orbitChanges };
};

console.log(main(spaceMap));
