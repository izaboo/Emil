
export function readFile(fileName){
  const fs = require("fs");
  const csv = fs.readFileSync("./data/" + fileName)
  const array = csv.toString().split("\n");
  array.splice(0,1);
  return array;
}