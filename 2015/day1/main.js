const findFloor = (input) => {
  const instuctions = input.split("");
  const floorsToGoUp = instuctions.filter((x) => x === "(").length;
  const floorsToGoDown = instuctions.filter((x) => x === ")").length;
  return floorsToGoUp - floorsToGoDown;
}

const part2 = (input) => {
  const instuctions = input.split("");
  let floor = 0;
  for (let index = 1; index < instuctions.length; index++) {
    instuctions[index] === "(" ? floor++ : floor--;
    if(floor === -1){
      return index;
    }    
  }
}

console.log(findFloor(Deno.readTextFileSync("./input.txt")));
console.log(part2(Deno.readTextFileSync("./input.txt")));