import {
  boostProgram,
  largeNumberInMiddle,
  makeCopy,
  relation8,
  sboostProgram,
  sixteenDigit,
} from "./input_data.js";
import { actions } from "./instuctions.js";
import { simpleDebugger } from "./debugger.js";

const parseInstruction = (instruction) => {
  const [parm3Mode, parm2Mode, parm1Mode, ...opcode] = instruction.toString()
    .padStart(5, "0").split("");
  return { parm3Mode, parm2Mode, parm1Mode, opCode: opcode.join("") };
};

const main = (memory) => {
  let index = 0;
  while (index < memory.length && memory[index] !== 99) {
    const instruction = parseInstruction(memory[index]);
    // simpleDebugger(memory, index, instruction);
    index = actions[instruction.opCode](memory, index, instruction);
  }
  return memory;
};

// main(relation8);
// main(makeCopy);
// main(sixteenDigit);
// main(largeNumberInMiddle);
main(boostProgram);
// main(sboostProgram);
