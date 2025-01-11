const fs = require('fs');

function part_one(equations: string[]): number {
  // Given:   An array of strings 'equations' representing a list of equations. The equation format is as follows:
  //        
  //          equations[i] = Result: Number Number Number ... Number
  //
  //          Result denotes a value that the subsequent 'Number' values must result in after executing either
  //          addition or multiplication operations against one another. The 'Number' values denote integers.
  //          The values should be processed from left to right, and not be rearranged in any way. Not all
  //          Results can be achieved with their respective Numbers.
  //
  // Task:    For each equation in 'equations', determine if the 'Result' value can be achieved by applying
  //          (*) or (+) opperations between the 'Number' values. If the 'Result' is possible to achieve,
  //          add the 'Result' value to a running sum.
  // 
  // Return:  The sum of all derivable 'Result' values in 'equations'.

  const execute = (target: number, numbers: number[], ops: number[]): boolean => {
    let res = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      res = (ops[i - 1] % 2 === 0) ? res * numbers[i] : res + numbers[i];
    }
    return res === target;
  }

  const gen_perm = (target: number, numbers: number[], arr: number[], index: number): boolean => {
    if (index === arr.length) return execute(target, numbers, arr);

    arr[index] = 1;
    if (gen_perm(target, numbers, arr, index + 1)) return true;;

    arr[index] = 0;
    if (gen_perm(target, numbers, arr, index + 1)) return true;

    return false;
  }

  let res = 0;
  for (const eq of equations) {
    const e = eq.replace(':', '').split(' ').map(Number);
    const t = e[0];
    const n = e.slice(1);

    if (n.reduce((a, b) => a * b) < t) continue;
    if (gen_perm(t, n, new Array(n.length - 1), 0)) res += t;
  }

  return res;
}

function part_two(equations: string[]): number {
  // Given:   An array of strings 'equations' representing a list of equations. The equation format is as follows:
  //        
  //          equations[i] = Result: Number Number Number ... Number
  //
  //          Result denotes a value that the subsequent 'Number' values must result in after executing either
  //          addition or multiplication operations against one another. The 'Number' values denote integers.
  //          The values should be processed from left to right, and not be rearranged in any way. Not all
  //          Results can be achieved with their respective Numbers.
  //
  // Task:    For each equation in 'equations', determine if the 'Result' value can be achieved by applying
  //          (*) or (+) opperations between the 'Number' values. If the 'Result' is possible to achieve,
  //          add the 'Result' value to a running sum.
  // 
  // Return:  The sum of all derivable 'Result' values in 'equations'.

  const execute = (target: number, numbers: number[], ops: number[]): boolean => {
    let res: number = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      switch (ops[i - 1]) {
        case 0: res *= numbers[i]; break;
        case 1: res += numbers[i]; break;
        case 2: res = Number(String(res) + String(numbers[i])); break;
      }
    }
    return res === target;
  }

  const gen_perm = (target: number, numbers: number[], arr: number[], index: number): boolean => {
    if (index === arr.length) return (execute(target, numbers, arr));

    arr[index] = 1;
    if (gen_perm(target, numbers, arr, index + 1)) return true;

    arr[index] = 0;
    if (gen_perm(target, numbers, arr, index + 1)) return true;

    arr[index] = 2;
    if (gen_perm(target, numbers, arr, index + 1)) return true;

    return false;
  }

  let res = 0;
  for (const eq of equations) {
    const e = eq.replace(':', '').split(' ').map(Number);
    const t = e[0];
    const n = e.slice(1);

    if (gen_perm(t, n, new Array(n.length - 1), 0)) res += t;
  }

  return res;
}

function main() {
  const input = fs.readFileSync('input', 'utf-8').split('\n')
  input.pop();

  console.log('Part one:', part_one(input));
  console.log('Part two:', part_two(input));
}

main();
