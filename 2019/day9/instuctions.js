let RELATIVEBASE = 0;

const dbg = (x) => console.log(x) || x;

const getDataAddress = (memory, index, mode) => {
  switch (mode) {
    case "0":
      return memory[index];
    case "1":
      return index;
    case "2":
      return RELATIVEBASE + memory[index];
  }
};

const getDataIndices = (memory, index, instruction) => {
  const A = getDataAddress(memory, index + 1, instruction.parm1Mode);
  const B = getDataAddress(memory, index + 2, instruction.parm2Mode);
  const res = getDataAddress(memory, index + 3, instruction.parm3Mode);
  return [A, B, res];
};

const getData = (memory, index) => memory[index] ? memory[index] : 0;

const addition = (memory, index, instruction) => {
  const [A, B, res] = getDataIndices(memory, index, instruction);
  memory[res] = getData(memory, A) + getData(memory, B);
  return index + 4;
};

const multiplication = (memory, index, instruction) => {
  const [A, B, res] = getDataIndices(memory, index, instruction);
  memory[res] = getData(memory, A) * getData(memory, B);
  return index + 4;
};

const input = (memory, index, instruction) => {
  const writeAddress = getDataAddress(memory, index + 1, instruction.parm1Mode);
  memory[writeAddress] = parseInt(prompt("Enter Input"));
  return index + 2;
};

const output = (memory, index, instruction) => {
  const readAddress = getDataAddress(
    memory,
    index + 1,
    instruction.parm1Mode,
  );
  console.log(memory[readAddress]);
  return index + 2;
};

const jmpIfTrue = (memory, index, instruction) => {
  const [A, B] = getDataIndices(memory, index, instruction);
  return getData(memory, A) !== 0 ? getData(memory, B) : index + 3;
};

const jmpIfFalse = (memory, index, instruction) => {
  const [A, B] = getDataIndices(memory, index, instruction);
  return getData(memory, A) === 0 ? getData(memory, B) : index + 3;
};

const lessThan = (memory, index, instruction) => {
  const [A, B, res] = getDataIndices(memory, index, instruction);
  memory[res] = getData(memory, A) < getData(memory, B) ? 1 : 0;
  return index + 4;
};

const equalTo = (memory, index, instruction) => {
  const [A, B, res] = getDataIndices(memory, index, instruction);
  memory[res] = getData(memory, A) === getData(memory, B) ? 1 : 0;
  return index + 4;
};

const relativeBase = (memory, index, instruction) => {
  const A = getDataAddress(memory, index + 1, instruction.parm1Mode);
  const offset = getData(memory, A);
  RELATIVEBASE = RELATIVEBASE + offset;

  return index + 2;
};

export const actions = {
  "01": addition,
  "02": multiplication,
  "03": input,
  "04": output,
  "05": jmpIfTrue,
  "06": jmpIfFalse,
  "07": lessThan,
  "08": equalTo,
  "09": relativeBase,
};
