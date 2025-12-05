import { permutations } from "jsr:@std/collections";
import { ampMemory } from "./input_data.js";
import { actions } from "./instuctions.js";

const parseInstruction = (instruction) => {
  const [parm3Mode, parm2Mode, parm1Mode, ...opcode] = instruction.toString()
    .padStart(5, "0").split("");
  return { parm3Mode, parm2Mode, parm1Mode, opCode: opcode.join("") };
};

const runComputer = ({ cmd, lastOutput, memory }) => {
  const acc = { input: [cmd, lastOutput], inputIndex: 0, output: 0 };
  let index = 0;
  while (index < memory.length && memory[index] !== 99) {
    const instruction = parseInstruction(memory[index]);
    index = actions[instruction.opCode](memory, index, instruction, acc);
  }
  return acc.output;
};

const runAmpCode = (RAM, memory) => {
  let lastOutput = 0;
  for (const code of RAM) {
    const memoryCopy = memory.slice();
    const resource = { cmd: code, lastOutput: lastOutput, memory: memoryCopy };
    lastOutput = runComputer(resource);
  }
  return lastOutput;
};

const main = (memory) => {
  const inputCombinations = permutations([0, 1, 2, 3, 4]);
  const bestCombination = inputCombinations.reduce((res, ampCode) => {
    const thrust = runAmpCode(ampCode, memory);
    if (thrust > res) return thrust;
    return res;
  }, 0);
  console.log(bestCombination);
};

main(ampMemory);
