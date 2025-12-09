import { permutations } from "jsr:@std/collections";
import { ampMemory } from "./input_data.js";
import { actions } from "./instuctions.js";

const dbg = (x) => {
  console.log(x);
  return x;
};

const parseInstruction = (instruction) => {
  const [parm3Mode, parm2Mode, parm1Mode, ...opcode] = instruction.toString()
    .padStart(5, "0").split("");
  return { parm3Mode, parm2Mode, parm1Mode, opCode: opcode.join("") };
};

// const runComputer = (data) => {
//   const [input, lastOutput] = data.input
//   const acc = { input: [input, lastOutput], inputIndex: 0, output: 0 }; // this has to kept in memory
//   while (data.pointer < data.memory.length && data.memory[data.pointer] !== 99) {

//     const instruction = parseInstruction(data.memory[data.pointer]);

//     data.pointer = actions[instruction.opCode](data.memory, data.pointer, instruction, acc);

//   if (data.memory[data.pointer] === 4) {
//     console.log("output data")
//     dbg(data.pointer)
//     data.pointer = data.pointer + 1;
//     dbg(data.pointer)

//     break;
//   }
//   }
//   if (data.memory[data.pointer] === 99) console.log(data.memory.length, data.pointer, "Halted");
//   return {output: acc.output, pointer : data.pointer};
// };

const runComputer = (amp) => {
  // dbg(amp)
  // prompt()
  const memory = amp.memory;
  let pointer = amp.pointer;

  const acc = {input: amp.input, output: amp.output};

  while(pointer < memory.length && !amp.isHalted) {
    const instruction = parseInstruction(memory[pointer]);

    if (instruction.opCode === "99") {
      amp.output = acc.input[0];
      amp.isHalted = true;
      return amp;
    }
    if (instruction.opCode === "04") {
      amp.pointer = actions[instruction.opCode](memory, pointer, instruction, acc);
      amp.output = acc.output;
      amp.memory = memory;
      return amp;
    }
    pointer = actions[instruction.opCode](memory, pointer, instruction, acc)
  }

}

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
  let index = ampsRecord.length;
  let lastOutput = 0;
  const lastAmp = ampsRecord[ampsRecord.length - 1];

  while (!lastAmp.isHalted) {
    const amp = ampsRecord[index % ampsRecord.length];
    amp.input.unshift(lastOutput);
    runComputer(amp);
    lastOutput = amp.output;
    index++;
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
