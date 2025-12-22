import { puzzleInput } from "./input.js";

const getAsteroidCoordinates = (asteroid_map) => {
  const rows = asteroid_map.split("\n");
  const coordinates = [];

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (rows[i][j] === "#") {
        coordinates.push([i, j]);
      }
    }
  }
  return coordinates;
};

const angle = ([x1, y1], [x2, y2]) => Math.atan2(y2 - y1, x2 - x1);

const distance = ([x1, y1], [x2, y2]) =>
  Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));

const angleAndDistance = (p1, p2) => [angle(p1, p2), distance(p1, p2)];

const getAngleAndDistanceOfOtherPoints = (originIndex, coordinates) => {
  const otherPoints = [];
  for (let index = 0; index < coordinates.length; index++) {
    if (originIndex !== index) {
      otherPoints.push(
        angleAndDistance(coordinates[originIndex], coordinates[index]),
      );
    }
  }
  return otherPoints;
};

const getClosestPointsInView = (points) => {
  points.sort((a, b) => b[1] - a[1]);
  return points.reduce((res, x) => {
    res[x[0]] = x[1];
    return res;
  }, {});
};

const getVisibilityCountForEachAsteroid = (coordinates) => {
  const visibilityCount = {};
  for (let i = 0; i < coordinates.length; i++) {
    const neighbouringPoints = getAngleAndDistanceOfOtherPoints(i, coordinates);
    const points = getClosestPointsInView(neighbouringPoints);
    visibilityCount[coordinates[i]] = Object.keys(points).length;
  }
  return visibilityCount;
};

const highestVisiblityCount = (visibilityCount) => {
  let viewCount = 0;
  for (const location in visibilityCount) {
    if (visibilityCount[location] > viewCount) {
      viewCount = visibilityCount[location];
    }
  }
  return viewCount;
};

const part1 = (input) => {
  const asteroidCoordinates = getAsteroidCoordinates(input);
  const visibilityCount = getVisibilityCountForEachAsteroid(
    asteroidCoordinates,
  );
  return highestVisiblityCount(visibilityCount);
};

const main = (input) => {
  console.log(part1(input));
};

// main(input3);
// main(input4);
// main(input6);
main(puzzleInput);
