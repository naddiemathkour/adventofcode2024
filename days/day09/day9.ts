const fs = require('fs');

function part_one(disk: string): number {
  // Given:   An input string 'disk' denoting files and free space within a
  //          memory disk. Disk contains a string of numbers denoting pairs of
  //          files and free space following that file. Namely, for ever pair
  //          of numbers from 0 to n, the even numbered indicies represent the
  //          file id, while the following odd numbered index represents the 
  //          total free space within that file's block of memory.
  // 
  // Task:    There are many gaps found within the memory space of the disk.
  //          Alleviate this issue by moving memory from the end of the disk
  //          into the open spaces within the disk. This should be done in
  //          order of last number in the string 'disk' being moved piece by
  //          piece into the first available free location in memory (from the
  //          start).
  //
  // Return:  The checksum value of the disk's memory.

  let defrag = []
  let idx = 0;
  for (let i = 0; i < disk.length; i += 2) {
    defrag.push(...new Array(Number(disk[i])).fill(idx++))
    defrag.push(...new Array(Number(disk[i + 1])).fill('.'))
  }

  let l, r;
  l = defrag.indexOf('.');
  r = defrag.length;

  while (r-- > l) {
    if (defrag[r] === '.') continue;

    while (l < r && defrag[l] !== '.') l++;
    if (defrag[l] === '.') {
      defrag[l] = defrag[r];
      defrag[r] = '.';
    }
  }

  let i = 0;
  let checksum = 0;
  while (defrag[i] !== '.') {
    checksum += defrag[i] * i++;
  }

  return checksum;
}

function part_two(disk: string): number {
  // Given:   An input string 'disk' denoting files and free space within a
  //          memory disk. Disk contains a string of numbers denoting pairs of
  //          files and free space following that file. Namely, for ever pair
  //          of numbers from 0 to n, the even numbered indicies represent the
  //          file id, while the following odd numbered index represents the 
  //          total free space within that file's block of memory.
  // 
  // Task:    There are many gaps found within the memory space of the disk.
  //          Alleviate this issue by moving memory from the end of the disk
  //          into the open spaces within the disk. This should be done in
  //          order of last number in the string 'disk' being moved file by
  //          file into the first available free location in memory (from the
  //          start) that the file can fully fit into.
  //
  // Return:  The checksum value of the disk's memory.

  let diskmem = [];
  let idx = 0;
  for (let i = 0; i < disk.length; i += 2) {
    diskmem.push(new Array(Number(disk[i])).fill(String(idx++)));
    if (Number(disk[i + 1]) > 0)
      diskmem.push(new Array(Number(disk[i + 1])).fill('.'));
  }

  for (let r = diskmem.length - 1; r > 0; r--) {
    if (diskmem[r][0] === '.') continue;
    for (let l = 0; l < r; l++) {
      const diff = diskmem[l].length - diskmem[r].length;
      if (diff < 0 || diskmem[l][0] !== '.')
        continue;

      const temp: string[] = [...diskmem[r]];
      diskmem[r] = new Array(diskmem[r].length).fill('.');
      diskmem[l] = temp;

      if (diff > 0) {
        diskmem.splice(++l, 0, new Array(diff).fill('.'));
        l++
        while (diskmem[l][0] === '.' && diskmem[l - 1]) {
          diskmem[l - 1].push(...diskmem[l]);
          l--;
        }
      }
    }
  }

  let res = 0;
  idx = 0;
  for (const block of diskmem) {
    for (const cell of block) {
      res += idx * (Number(cell) || 0);
      idx++;
    }
  }

  return res; //90952373146 117066728626 6470544599471 low 6470546665072 high 
}

function main() {
  const input = fs.readFileSync('input', 'utf-8');

  console.log('Part one:', part_one(input));
  console.log('Part two:', part_two(input));
}

main();
