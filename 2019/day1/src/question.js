export const calcFuelForMass = (mass) => {
  const fuel = Math.floor(mass / 3) - 2;
  return fuel > 0 ? fuel : 0;
};

export const add = (a, b) => a + b;

export const calcTotalFuelForModules = (modules) =>
  modules.map(calcFuelForMass).reduce(add);

export const calcFuelForFuel = (modules) =>
  modules.map(calcTotalFuel).reduce(add);

export const calcTotalFuel = (module) => {
  const fuel = calcFuelForMass(module);
  let remainingMass = fuel;
  let fuelForMass = 0;
  while (remainingMass > 0) {
    remainingMass = calcFuelForMass(remainingMass);
    fuelForMass = fuelForMass + remainingMass;
  }
  return fuel + fuelForMass;
};
