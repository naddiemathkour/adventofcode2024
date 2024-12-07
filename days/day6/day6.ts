const fs = require('fs');

const dir: Record<string, [number, number]> = {
  '^': [-1, 0],
  'v': [1, 0],
  '<': [0, -1],
  '>': [0, 1]
}

const turn: Record<string, string> = {
  '^': '>',
  'v': '<',
  '<': '^',
  '>': 'v'
}

function get_start(map: string[]): number[] | null {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[j].length; j++) {
      if (!'#.'.includes(map[i][j])) return [i, j]
    }
  }
  return null
}

function trace_path(room: string[], start: number[]): Map<string, number> {
  let trace: Map<string, number> = new Map<string, number>();
  let position = [...start];
  let direction = room[start[0]][start[1]];

  trace.set(String(position), 1);

  const inRoom = (pos: number[]) => {
    const hlen = room.length;
    const rlen = room[0].length;

    if (pos[0] >= hlen || pos[1] >= rlen) return false;
    if (pos[0] < 0 || pos[1] < 0) return false;
    return true;
  }

  while (inRoom(position)) {
    const row = position[0];
    const col = position[1];

    let d = dir[direction];
    let step = [row + d[0], col + d[1]];

    // Turn until walkable
    while (room[step[0]]?.[step[1]] === '#') {
      direction = turn[direction];
      d = dir[direction]
      step = [row + d[0], col + d[1]];
    }

    position = step;
    const index = String(position);
    trace.set(index, (trace.get(index) || 0) + 1);
  }

  trace.delete(String(position));

  return trace;
}

function part_one(input: string[]): number {
  // Given:   An array of strings representing a room's floorplan. This floorplan can contain one of three values:
  //          '.' indicates a walkable area in the room
  //          '#' indicates an obstacle that would obstruct movement completely
  //          '^ | v | < | >' indicates a single gaurd's position pointing in the direction the gaurd is moving.
  //          The gaurd can only move in straight lines and will continue to move forward in its pointing
  //          direction until coming in contact with an obstacle or walking out of the room. In the event that
  //          the gaurd reaches an obstacle, they can no longer move forward and instead must turn 90* to the 
  //          right, repeating the movement rule process. The gaurd is considered "out of the room" when they 
  //          have walked off one of the map's edges.
  // 
  // Task:    Map out which tiles the gaurd will traverse while they patrol the room. Namely, if the gaurd is able
  //          to traverse a path in front of them, that path is considered traversed.
  // 
  // Return:  The number of distinct tiles that the gaurd can traverse in their patrol.

  // Find starting position
  const start = get_start(input);
  const positions = trace_path(input, start!);

  return [...positions.keys()].length; //4827 high
}

function find_cycle(room: string[], start: number[]): boolean {
  let trace: Map<string, number> = new Map<string, number>();
  let position = [...start];
  let direction = room[start[0]][start[1]];

  trace.set(String(position), 1);

  const inRoom = (pos: number[]) => {
    const hlen = room.length;
    const rlen = room[0].length;

    if (pos[0] >= hlen || pos[1] >= rlen) return false;
    if (pos[0] < 0 || pos[1] < 0) return false;
    return true;
  }

  while (inRoom(position) && trace.get(String(position))! < 5) {
    const row = position[0];
    const col = position[1];

    let d = dir[direction];
    let step = [row + d[0], col + d[1]];

    // Turn until walkable
    while (room[step[0]]?.[step[1]] === '#') {
      direction = turn[direction];
      d = dir[direction]
      step = [row + d[0], col + d[1]];
    }

    position = step;
    const index = String(position);
    trace.set(index, (trace.get(index) || 0) + 1);
  }

  return trace.get(String(position))! >= 5;
}

function part_two(input: string[]): number {
  // Given:   An array of strings representing a room's floorplan. This floorplan can contain one of three values:
  //          '.' indicates a walkable area in the room
  //          '#' indicates an obstacle that would obstruct movement completely
  //          '^ | v | < | >' indicates a single gaurd's position pointing in the direction the gaurd is moving.
  //          The gaurd can only move in straight lines and will continue to move forward in its pointing
  //          direction until coming in contact with an obstacle or walking out of the room. In the event that
  //          the gaurd reaches an obstacle, they can no longer move forward and instead must turn 90* to the 
  //          right, repeating the movement rule process. The gaurd is considered "out of the room" when they 
  //          have walked off one of the map's edges.
  //
  // Task:    Derive all possible instances in which placing a single obstacle in the gaurd's current path such that
  //          the gaurd will find themselves in a cycle. Namely, the gaurd will hit your newly placed obstacle, then
  //          get routed towards at least 3 already placed obstacles that would, after hitting all three obstacles,
  //          route the gaurd back to your newly placed obstacle.
  // 
  // Return:  The total number of possible cycles you can create by placing a single new obstacle in the gaurd's path.

  const start = get_start(input);
  if (!start) return -1;
  const path = trace_path(input, start!);
  let room: string[] = [...input];

  let poss = [...path.keys()];
  let res = 0;

  for (const tile of poss) {
    if (tile === String(start)) continue;
    const temp = tile.split(',').map(Number);
    const row = temp[0];
    const col = temp[1];
    let str = room[row].split('');

    str[col] = '#';
    room[row] = str.join('');
    if (find_cycle(room, start)) res++;
    str[col] = '.';
    room[row] = str.join('');
  }

  return res;
}

function main() {
  const input: string[] = fs.readFileSync('input', 'utf-8').split('\n');

  console.log('Part one:', part_one(input));
  console.log('Part two:', part_two(input));
}

main();
