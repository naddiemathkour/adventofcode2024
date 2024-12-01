const fs = require('fs');

function part_one(listA: number[], listB: number[]) {
  // Given: 2 lists of numbers indicating Location ID'split
  // Task: For each number in sorted listA and sorted listB:
  //       sum the absolute value of distances listA[i] and listB[i]
  // Return: The sumation of differences between equal indecies in both lists
  let res = 0;

  for (let i = 0; i < listA.length; i++) {
    res += Math.abs(listA[i] - listB[i]);
  }
  console.log('Part one:', res);
}

function part_two(listA: number[], listB: number[]) {
  // Given: 2 lists of numbers
  // Task: Identify the frequency of numbers from listA in listB
  // i.e. How many times does listA[i] appear in listB?
  // Then, multiply listA[i] by n times it appears in listB
  // Return: The total sum of listA[i] * n

  const b = listB;
  const a = listA;
  const len = a.length;
  
  let res = 0;
  for (let i = 0; i < len; i++) {
    let l: number, r: number, m: number;
    l = 0, r = len - 1, m = Math.floor((l + r) / 2); 
    const t = a[i];
    let count = 0;

    while (l <= r) {
      m = Math.floor((l + r) / 2);
      if (b[m] === t) {
        l = m;
        r = m;
        while (l > 0 && b[l - 1] === t) l--;
        while (r < b.length - 1 && b[r + 1] === t) r++;
        count = r - l + 1;
        break;
      }
      if (b[m] < t) {
        l = m + 1;
        continue;
      }
      if (b[m] > t) {
        r = m - 1;
      }
    }

    res += t * count;
  }
  console.log('Part two:', res);
}

function main() {
  let input: string[] = fs.readFileSync('input', 'utf-8').split('\n');
  let listA: number[] = [];
  let listB: number[] = [];
  for (const row of input) {
    const temp = row.split(' ');
    const numA = Number(temp[0]);
    const numB = Number(temp[3]);
    if (isNaN(numA) || isNaN(numB)) continue;
    listA.push(numA);
    listB.push(numB);
  }
  listA.sort((a, b) => a - b);
  listB.sort((a, b) => a - b);

  part_one(listA, listB);
  part_two(listA, listB);
}

main();
