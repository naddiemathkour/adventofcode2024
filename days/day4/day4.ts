const fs = require('fs');

function part_one(hs: string[]) {
  // Given: A block of letters /[XMAS]/+ that represents a word search
  //        The only word that needs to be found is "XMAS". This word
  //        can be writing left to right, backwards, vertically, horizontally, and diagonally
  //
  // Task: Parse out any match for the requirements of XMAS
  // Return: The total count of matches for the requirements of XMAS

  const needles = ["XMAS", "SAMX"];
  let count = 0;
  const test = (str: string) => {
    if (needles.includes(str)) count++;
  }

  const parse = (row: number, col: number) => {
    // Test all 8 possible directions for "XMAS" or "SAMX"
    test(hs[row].slice(col, col + 4));
    test(hs[row].slice(col-3, col+1));

    // Up
    let temp = ""
    for (let r = row; temp.length < 4; r--) {
      temp += hs[r]?.[col] || '.';
    }
    test(temp);
    
    // Down
    temp = ""
    for (let r = row; temp.length < 4; r++) {
      temp += hs[r]?.[col] || '.';
    }
    test(temp);

    // Diagonal down-right and up-left
    temp = "";
    for (let r = row, c = col; temp.length < 4; r++, c++) temp += hs[r]?.[c] || '.';
    test(temp);

    temp = "";
    for (let r = row, c = col; temp.length < 4; r--, c--) temp += hs[r]?.[c] || '.';
    test(temp);

    // Diagonal down-left and up-right
    temp = "";
    for (let r = row, c = col; temp.length < 4; r++, c--) temp += hs[r]?.[c] || '.';
    test(temp);

    temp = "";
    for (let r = row, c = col; temp.length < 4; r--, c++) temp += hs[r]?.[c] || '.';
    test(temp);
  }

  const height = hs.length;
  const width = hs[0].length;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (hs[row][col] === 'X') {
        parse(row, col);
      }
    }
  }
  
  return count; //2199 low 2854 high
}


function part_two(hs: string[]) {
  // Given: A block of letters /[XMAS]/+ that represents a word search
  //        The only word that needs to be found is "MAS". This word
  //        can only exist diagonally and must have an accomponying "MAS" that uses the same "A".
  //        This means that you are looking for:
  //
  //                              "M . M"
  //                              ". A ."
  //                              "S . S"
  //
  //        Note: "MAS" may be re-written as "SAM" for either diagonal direction.
  //
  // Task: Parse out any match for the requirements of XMAS
  // Return: The total count of matches for the requirements of XMAS

  const needles = ["MAS", "SAM"];
  let count = 0;
  const test = (str1: string, str2: string) => {
    if (needles.includes(str1) && needles.includes(str2)) count++;
  }

  const parse = (row: number, col: number) => {
    // Test all possible directions for "MAS" or "SAM"
    // Diagonal down-right and up-left
    let temp1 = "";
    for (let r = row-1, c = col-1; temp1.length < 3; r++, c++) temp1 += hs[r]?.[c] || '.';

    let temp2 = "";
    for (let r = row-1, c = col+1; temp2.length < 3; r++, c--) temp2 += hs[r]?.[c] || '.';

    test(temp1, temp2);
  }

  const height = hs.length;
  const width = hs[0].length;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (hs[row][col] === 'A') {
        parse(row, col);
      }
    }
  }
  
  return count; //749 low 2751 high
}

function main() {
  const input = fs.readFileSync('input', 'utf-8').split('\n')
  
  console.log('Part one:', part_one(input));
  console.log('Part two:', part_two(input));
}

main();
