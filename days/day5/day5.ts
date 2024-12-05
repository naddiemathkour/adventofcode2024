import test from "node:test";

const fs = require('fs');

function part_one(r: string[], u: string[]): number {
  // Given: Two string arrays 'r' denoting a set of '|' delimited rules and 'u' denoting a set of page numbers in an update.
  //        
  //        The rules are given to you in 'X|Y' format. This denotes a before and after rule for page numbers coming from 
  //        updates 'u'. Namely, in updates 'u', if a page number X would chronologically appear before a page number Y, then
  //        the rule has not been broken. Alternatively, if page Y comes before page X in an update, this breaks the rule.
  //
  //        The updates are given to you in 'X, Y, Z...' format. This denotes the order of pages used in the update. In order
  //        to determine the validity of an update, the order of numbers in update must be checked against the rules set out
  //        in the rules 'r' array.
  // 
  // Task:  For each update in 'u', determine whether the update abides be the rules in 'r'. If the update is rule abiding,
  //        add its middle page value to a running checksum.
  //
  //Return: The final checksum value after all updates have been checked for validity.
  
  let rules: Map<string, string[]> = new Map<string, string[]>
  for (const n of r) {
    const temp = n.split('|')
    if (!rules.has(temp[0])) rules.set(temp[0], [temp[1]]);
    else rules.set(temp[0], [...rules.get(temp[0])!, temp[1]]);
  }

  let checkSum = 0;
  let valid: boolean;
  for (const s of u) {
    const temp = s.split(',');
    valid = true;
    for (let i = 0; i < temp.length - 1; i++) {
      const curr = temp[i];
      const next = temp[i+1];

      if (!rules.get(curr)?.includes(next)) {
        valid = false;
        break;
      }
    }
    
    if (valid) checkSum += Number(temp[Math.floor(temp.length / 2)]);
  }

  return checkSum; //598 low
}

function part_two(r: string[], u: string[]): number {
  // Given: Two string arrays 'r' denoting a set of '|' delimited rules and 'u' denoting a set of page numbers in an update.
  //        
  //        The rules are given to you in 'X|Y' format. This denotes a before and after rule for page numbers coming from 
  //        updates 'u'. Namely, in updates 'u', if a page number X would chronologically appear before a page number Y, then
  //        the rule has not been broken. Alternatively, if page Y comes before page X in an update, this breaks the rule.
  //
  //        The updates are given to you in 'X, Y, Z...' format. This denotes the order of pages used in the update. In order
  //        to determine the validity of an update, the order of numbers in update must be checked against the rules set out
  //        in the rules 'r' array.
  // 
  // Task:  For each update in 'u', determine whether the update abides be the rules in 'r'. If the update is rule abiding,
  //        add its middle page value to a running checksum. Additionally, for each invalid update in 'u', rearrange the pages
  //        such that the update becomes valid. After doing so, add its middle value to the running checksum.
  //        Note: You must ONLY reorder the incorrectly ordered values.
  //
  //Return: The final checksum value of only updates that were reordered.

  let rules: Map<string, string[]> = new Map<string, string[]>
  for (const n of r) {
    const temp = n.split('|')
    if (!rules.has(temp[0])) rules.set(temp[0], [temp[1]]);
    else rules.set(temp[0], [...rules.get(temp[0])!, temp[1]]);
  }

  const testUpdate = (update: string[]): boolean => {
    for (let i = 0; i < update.length; i++) {
      for (let j = i + 1; j < update.length; j++) {
        if (rules.get(update[j])?.includes(update[i])) return false;
      }
    }
    return true;
  };

  const reorder = (temp: string[]): string[] => {
    // Reorder the array without moving values that are correctly placed
    // Namely, only move a page if it is not in its correct order.
    while (!testUpdate(temp))
    for (let i = 0; i < temp.length - 1; i++) {
      const curr = temp[i];
      const next = temp[i+1];

      if (!rules.get(curr)?.includes(next)) { temp[i] = next;
        temp[i+1] = curr;
        i--;
      }
    }
    return temp;
  }

  let checkSum = 0;

  for (const s of u) {
    let temp = s.split(',');
    if (!testUpdate(temp)) {
      temp = reorder(temp);
      const middle = Math.floor(temp.length / 2);
      checkSum += Number(temp[middle]);
    }
  }
      
  return checkSum;
}

function main() {
  const input = fs.readFileSync('input', 'utf-8').split('\n\n');
  const rules = input[0].split('\n')
  const updates = input[1].split('\n');
  updates.pop();
  
  console.log('Part one:', part_one(rules, updates));
  console.log('Part two:', part_two(rules, updates));
}

main();
