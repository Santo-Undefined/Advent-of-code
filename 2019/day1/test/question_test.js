import { assertEquals } from "jsr:@std/assert";
import {
  add,
  calcFuelForFuel,
  calcFuelForMass,
  calcTotalFuel,
  calcTotalFuelForModules,
} from "../src/question.js";
import { part1Input } from "../data/mass_data.js";

Deno.test("simple mass 12", () => {
  assertEquals(calcFuelForMass(12), 2);
});
Deno.test("simple mass 2", () => {
  assertEquals(calcFuelForMass(2), 0);
});
Deno.test("simple mass 14", () => {
  assertEquals(calcFuelForMass(14), 2);
});
Deno.test("simple mass 1969", () => {
  assertEquals(calcFuelForMass(1969), 654);
});
Deno.test("simple mass 100756", () => {
  assertEquals(calcFuelForMass(100756), 33583);
});
Deno.test("add 5 3", () => {
  assertEquals(add(5, 3), 8);
});
Deno.test("calculate total mass", () => {
  assertEquals(calcTotalFuelForModules([12, 14]), 4);
});
Deno.test("calculate total mass for puzzel input", () => {
  assertEquals(calcTotalFuelForModules(part1Input), 3402634);
});
Deno.test("fuel for fuel", () => {
  assertEquals(calcTotalFuel(2), 0);
});
Deno.test("fuel for fuel", () => {
  assertEquals(calcTotalFuel(14), 2);
});
Deno.test("fuel for fuel", () => {
  assertEquals(calcTotalFuel(1969), 966);
});
Deno.test("fuel for fuel", () => {
  assertEquals(calcFuelForFuel([1969]), 966);
});
Deno.test("fuel for fuel", () => {
  assertEquals(calcFuelForFuel([100756]), 50346);
});
Deno.test("fuel for fuel", () => {
  assertEquals(calcFuelForFuel(part1Input), 5101069);
});
