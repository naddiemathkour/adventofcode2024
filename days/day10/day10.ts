const fs = require('fs');

function part_one(trails: string[]): number {
  let starts: number[][] = [];
  for (let i = 0; i < trails.length; i++) {
    for (let j = 0; j < trails[i].length; j++) {
      if (trails[i][j] === '0') starts.push([i, j]);
    }
  }

  let curr: string = "";
  let scores: Map<string, number> = new Map<string, number>();
  const dfs = (row: number, col: number, height: number) => {
    console.log(curr, trails[row][col])
    for (let i = 0; i < trails.length; i++) {
      let temp = ""
      for (let j = 0; j < trails[i].length; j++) {
        temp += (i === row && j === col) ? "X" : trails[i][j];
      }
      console.log(temp)
    }
    if (height === 9) {
      scores.set(curr, (scores.get(curr) || 0) + 1);
      console.log('@@@HIT@@@')
      return;
    }

    // Traverse all directions if possible
    if (+trails[row - 1]?.[col] === height + 1) dfs(row - 1, col, height + 1);
    if (+trails[row + 1]?.[col] === height + 1) dfs(row + 1, col, height + 1);
    if (+trails[row]?.[col - 1] === height + 1) dfs(row, col - 1, height + 1);
    if (+trails[row]?.[col + 1] === height + 1) dfs(row, col + 1, height + 1);
  }

  // Trace starting positions
  for (const s of starts) {
    curr = String(s);
    dfs(+s[0], +s[1], 0);
  }

  console.log(scores);

  return 0;
}

function main() {
  const input = fs.readFileSync('sample', 'utf-8').split('\n');

  console.log(part_one(input));
}

main();
