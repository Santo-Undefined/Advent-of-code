import {chunk} from 'jsr:@std/collections'


let MEMORYRANGE = -Infinity;

const formatMemory = (memory, index) => {
  if(index > MEMORYRANGE){
    MEMORYRANGE = index + 180;
  }
  const slice =  memory.slice(MEMORYRANGE - 180, MEMORYRANGE);
  slice[index] = "\x1B[42m" + (""+memory[index]).padStart(8," ") + "\x1B[0m"
  const rows = chunk(slice,12);
  return rows.map(x=> x.map((x) => (x + "").padStart(8, " "))).join("\n")
}

let steps = 0;

export const simpleDebugger = (memory, index, instructions) => {
  prompt("step forward")
  console.clear();
  console.log(formatMemory(memory,index));
  console.log("steps", steps++);
  console.log("index:", index);
  console.log("instruction", instructions);

};
