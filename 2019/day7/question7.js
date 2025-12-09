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

// const runComputer = ({ cmd, lastOutput, memory }) => {
const runComputer = (data) => {
  const [input, lastOutput] = data.input
  const acc = { input: [input, lastOutput], inputIndex: 0, output: 0 }; // this has to kept in memory
  while (data.pointer < data.memory.length && data.memory[data.pointer] !== 99) {

    const instruction = parseInstruction(data.memory[data.pointer]);

    data.pointer = actions[instruction.opCode](data.memory, data.pointer, instruction, acc);

  if (data.memory[data.pointer] === 4) {
    console.log("output data")
    dbg(data.pointer)
    data.pointer = data.pointer + 1;
    dbg(data.pointer)

    break;
  }
  }
  if (data.memory[data.pointer] === 99) console.log(data.memory.length, data.pointer, "Halted");
  return {output: acc.output, pointer : data.pointer};
};

const makeAmpsRecords = (RAM, memory) => {
  const ampsRecord = [];
  for (const code of RAM) {
    ampsRecord.push({
      memory: memory.slice(),
      pointer: 0,
      cmd: code,
      output: 0,
      isHalted: false,
    });
  }
  return ampsRecord;
};

const isAllAmpsHalted = (ampsRecord) => {
  let flag = false;
  for (const amp of ampsRecord) {
    flag = flag && amp.isHalted
  }
  return flag;
}

const runAmpCode = (RAM, memory) => {
  const ampsRecord = makeAmpsRecords(RAM, memory);
  let index = ampsRecord.length;
  let lastOutput = 0;


  while (!isAllAmpsHalted(ampsRecord)) {
    const amp = ampsRecord[index % ampsRecord.length];


    const resource = {
      input: [amp.cmd, lastOutput],
      lastOutput: ampsRecord[(index - 1) % ampsRecord.length].output,
      memory: amp.memory,
      pointer: amp.pointer
    };
    const {pointer, output} = runComputer(resource)
    amp.pointer = pointer;
    lastOutput = amp.output;
    index++;

  }

  // for (const code of RAM) {
  //   const resource = { cmd: code, lastOutput: lastOutput, memory: memoryCopy };
  //   const currentOutput = runComputer(resource);
  //   if (currentOutput === "Halted") {
  //     finalOutput = currentOutput;
  //     break;
  //   }
  //   lastOutput = currentOutput;
  // }

  // console.log("result after running one set of ampCode", lastOutput);
  return lastOutput;
};

const makeCombinations = (data) => permutations(data);

// const codes = [0, 1, 2, 3, 4];
const codes = [5, 6, 7, 8, 9];

const main = (memory) => {
  // const inputCombinations = makeCombinations(codes);
  const inputCombinations = [[9,8,7,6,5]];
  const bestCombination = inputCombinations.reduce((res, ampCode) => {
    const thrust = runAmpCode(ampCode, memory);
    if (thrust > res) return thrust;
    return res;
  }, 0);
  console.log("best combination", bestCombination);
};

main(ampMemory);
