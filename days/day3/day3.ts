const fs = require('fs');

function part_one(input: string) {
  // Given: A string 'input' containing corrupted instructions. Instructions should be in the for mul(x,y)
  // Task: Parse through the corrupted input. When you come accross a valid instruction (see above), perform the instruction.
  // Return: A total sum of all performed instructions
  
  const pattern = /mul\(\d{1,3},\d{1,3}\)/g
  const matches = input.match(pattern);

  let res = 0;
  if (!matches) return res;

  for (const instruction of matches) {
    for (let i = 0; i < instruction.length; i++) {
      if (isNaN(Number(instruction[i]))) continue;
      let nums = instruction.slice(i, instruction.length - 1).split(',').map(Number);
      res += nums[0] * nums[1];
      break;
    }
  }

  return res;
}

function part_two(input: string) {
  // Given: A string 'input' containing corrupted instructions. Instructions should be in the for mul(x,y)
  //        Furthermore, there are 2 other patterns to recognize: do() and don't(). These patterns are on off switches
  //        for the mul() instruction. If a mul instruction is preceeded by a don't(), it should not be included in 
  //        the final sum. Otherwise, include the value in the final sum.
  // Task: Parse through the corrupted input. When you come accross a valid instruction (see above), perform the instructions
  //       per the do() and don't() requirements detailed above.
  // Return: A total sum of all performed instructions.
  const pattern = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;
  const matches = input.match(pattern);

  let res = 0;
  if (!matches) return res;
  
  let skip = false;
  for (const instruction of matches) {
    if (instruction === "don't()" && !skip) skip = true;
    if (instruction === "do()" && skip) skip = false;
    if (skip) continue;
    for (let i = 0; i < instruction.length; i++) {
      if (isNaN(Number(instruction[i]))) continue;
      let nums = instruction.slice(i, instruction.length - 1).split(',').map(Number);
      res += nums[0] * nums[1];
      break;
    }
  }

  return res;
}

function main() {
  const input = fs.readFileSync('input', 'utf-8');

  console.log('Part one:',part_one(input));
  console.log('Part two:', part_two(input));
}

main();
