const spaceMap = Deno.readTextFileSync("./smallData.txt");
const connection = spaceMap.split("\n").map((x) => {
 const [planet, satellite] = x.split(")")
 return {planet, satellite}
})
console.log(connection)