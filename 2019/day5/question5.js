import {smallData} from "./input_data.js"

const getDataAddress = (memory, index, mode) =>
  mode === "1" ? index : memory[index];

const getDataIndices = (memory, index, instruction) => {
  const A = getDataAddress(memory, index + 1, instruction.parm1Mode);
  const B = getDataAddress(memory, index + 2, instruction.parm2Mode);
  const res = getDataAddress(memory, index + 3, instruction.parm3Mode);
  return [A, B, res];
};

const sum = (memory, index, instruction) => {
  const [A, B, res] = getDataIndices(memory, index, instruction);
  memory[res] = memory[A] + memory[B];
  return index + 4;
};

const mul = (memory, index, instruction) => {
  const [A, B, res] = getDataIndices(memory, index, instruction);
  memory[res] = memory[A] * memory[B];
  return index + 4;
};

const ip = (memory, index) => {
  const writeAddress = memory[index + 1];
  memory[writeAddress] = parseInt(prompt("Enter Input"));
  return index + 2;
};

const op = (memory, index, instruction) => {
  const output = getDataAddress(memory, index + 1, instruction.parm1Mode);
  console.log(memory[output]);
  return index + 2;
};

const jmpIfTrue = (memory, index, instruction) => {
  const [A, B] = getDataIndices(memory, index, instruction);
  return memory[A] !== 0 ? memory[B] : index + 3;
};

const jmpIfFalse = (memory, index, instruction) => {
  const [A, B] = getDataIndices(memory, index, instruction);
  return memory[A] === 0 ? memory[B] : index + 3;
};

const lessThan = (memory, index, instruction) => {
  const [A, B, res] = getDataIndices(memory, index, instruction);
  memory[res] = memory[A] < memory[B] ? 1 : 0;
  return index + 4;
};

const equalTo = (memory, index, instruction) => {
  const [A, B, res] = getDataIndices(memory, index, instruction);
  memory[res] = memory[A] === memory[B] ? 1 : 0;
  return index + 4;
};

const parseInstruction = (instruction) => {
  const [parm3Mode, parm2Mode, parm1Mode, ...opcode] = instruction.toString()
    .padStart(5, "0").split("");
  return { parm3Mode, parm2Mode, parm1Mode, opCode: opcode.join("") };
};

const actions = {
  "01": sum,
  "02": mul,
  "03": ip,
  "04": op,
  "05": jmpIfTrue,
  "06": jmpIfFalse,
  "07": lessThan,
  "08": equalTo,
}

const main = (memory) => {
  let index = 0;
  while (index < memory.length && memory[index] !== 99) {
    const instruction = parseInstruction(memory[index]);
    index = actions[instruction.opCode](memory, index, instruction);
  }
  return memory;
}

main(smallData);
