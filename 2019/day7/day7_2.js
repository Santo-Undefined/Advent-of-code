import { permutations } from "jsr:@std/collections";
import { ampMemory } from "./input_data.js";
import { actions } from "./instuctions.js";

const parseInstruction = (instruction) => {
  const [parm3Mode, parm2Mode, parm1Mode, ...opcode] = instruction.toString()
    .padStart(5, "0").split("");
  return { parm3Mode, parm2Mode, parm1Mode, opCode: opcode.join("") };
};

const runComputer = (amp) => {
  const memory = amp.memory;
  let pointer = amp.pointer;

  const acc = { input: amp.input, output: amp.output };

  while (pointer < memory.length && !amp.isHalted) {
    const instruction = parseInstruction(memory[pointer]);

    if (instruction.opCode === "99") {
      amp.output = acc.input[0];
      amp.isHalted = true;
      return amp;
    }
    if (instruction.opCode === "04") {
      amp.pointer = actions[instruction.opCode](
        memory,
        pointer,
        instruction,
        acc,
      );
      amp.output = acc.output;
      amp.memory = memory;
      return amp;
    }
    pointer = actions[instruction.opCode](memory, pointer, instruction, acc);
  }
};

const makeAmpsRecords = (RAM, memory) => {
  const ampsRecord = [];
  for (const code of RAM) {
    ampsRecord.push({
      memory: memory.slice(),
      pointer: 0,
      input: [code],
      output: 0,
      isHalted: false,
    });
  }
  return ampsRecord;
};

const runAmpCode = (RAM, memory) => {
  const ampsRecord = makeAmpsRecords(RAM, memory);
  let ampIndex = ampsRecord.length;
  let lastOutput = 0;
  const lastAmp = ampsRecord[ampsRecord.length - 1];

  while (!lastAmp.isHalted) {
    const amp = ampsRecord[ampIndex % ampsRecord.length];
    amp.input.unshift(lastOutput);
    runComputer(amp);
    lastOutput = amp.output;
    ampIndex++;
  }
  return lastOutput;
};

const makeCombinations = (data) => permutations(data);

const CODES = [5, 6, 7, 8, 9];

const main = (memory) => {
  const inputCombinations = makeCombinations(CODES);
  const highestThrust = inputCombinations.reduce((res, ampCode) => {
    const thrust = runAmpCode(ampCode, memory);
    return thrust > res ? thrust : res;
  }, 0);
  console.log("Highest thrust", highestThrust);
};

main(ampMemory);
