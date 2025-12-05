import { ampMemory, example3, smallData } from "./input_data.js";
import { actions } from "./instuctions.js";

const parseInstruction = (instruction) => {
  const [parm3Mode, parm2Mode, parm1Mode, ...opcode] = instruction.toString()
    .padStart(5, "0").split("");
  return { parm3Mode, parm2Mode, parm1Mode, opCode: opcode.join("") };
};

const runComputer = (IO, memory) => {

}

const runAmpCode = (RAM, memory) => {
  // console.log({ RAM });
  let lastOutput = 0;
  for (const code of RAM) {
    const memoryCopy = memory.slice();
    const acc = { input: [code, lastOutput], inputIndex: 0, output: 0 };
    
    let index = 0;
    while (index < memoryCopy.length && memoryCopy[index] !== 99) {
      const instruction = parseInstruction(memoryCopy[index]);
      index = actions[instruction.opCode](memoryCopy, index, instruction, acc);
    }
    // console.log(acc.input, "output", acc.output);
    lastOutput = acc.output;
  }
  console.log(lastOutput)
};

const INPUT = [[0,1,2,3,4]];

const main = (memory) => {

  INPUT.reduce((res, ampCode) => {
    const thrust = runAmpCode(ampCode, memory);
    console.log(thrust)
    if (thrust > res) return thrust;
    return res;
  },0);
};

main(ampMemory);
