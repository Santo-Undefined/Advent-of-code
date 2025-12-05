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

const ip = (memory, index, instruction, acc) => {
  const [writeAddress] = getDataIndices(memory, index, instruction, 0);
  memory[writeAddress] = acc.input[acc.inputIndex];
  // console.log(inputIndex)
  acc.inputIndex = acc.inputIndex + 1;
  return index + 2;
};

const op = (memory, index, instruction, acc) => {
  const output = getDataAddress(memory, index + 1, instruction.parm1Mode);
  acc.output = memory[output]
  // console.log(memory[output]);
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

export const actions = {
  "01": sum,
  "02": mul,
  "03": ip,
  "04": op,
  "05": jmpIfTrue,
  "06": jmpIfFalse,
  "07": lessThan,
  "08": equalTo,
}