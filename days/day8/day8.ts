const fs = require('fs');

function part_one(map: string[]): number {
  // Given:   An array of strings 'map' denoting antenna locations within a city.
  //          Antenna locations are denoted by a character [a-zA-Z0-9]. Non-antenna
  //          locations are denoted by the '.' character. Antennas are not able to
  //          function properly alone. Antennas require another antenna of the same
  //          frequency, denoted by its character, to emit its signal properly.
  //          When two Antennas of the same frequency exist in the same linear plane,
  //          this result is achieved. Two 'antinodes' are then created at positions
  //          opposite one another such that the antennas are equally encapsolated
  //          between the two antinodes. Namely, antenna1 is equally far from
  //          antinode2 as antenna2 is from antinode1 (in this example, antinode1
  //          is the antinode closest to antenna1). Antinodes are not physically
  //          placed, but instead inferred. This means that an antenna can exist
  //          in the inferred position of an antinode.
  // 
  // Task:    Determine how many antinodes exist within the given map's perimeter
  //
  // Return:  The total number of unique locations within the map's perimeter that
  //          contain an antinode. (Antinodes can overlap on the same position)

  let antPos: Map<string, number[][]> = new Map<string, number[][]>();
  let nodePos: Map<string, number> = new Map<string, number>();

  const map_antinodes = (freq: string) => {
    const antList = antPos.get(freq)!

    for (let i = 0; i < antList.length; i++) {
      const ant1 = antList[i];
      for (let j = i + 1; j < antList.length; j++) {
        const ant2 = antList[j];
        const v = ant2[0] - ant1[0];
        const h = ant2[1] - ant1[1];

        const node1 = [ant1[0] - v, ant1[1] - h];
        const node2 = [ant2[0] + v, ant2[1] + h];

        if (node1[0] >= 0
          && node1[0] < map[i].length
          && node1[1] >= 0
          && node1[1] < map.length)
          nodePos.set(String(node1), (nodePos.get(String(node1)) || 0) + 1)

        if (node2[0] >= 0
          && node2[0] < map[i].length
          && node2[1] >= 0
          && node2[1] < map.length)
          nodePos.set(String(node2), (nodePos.get(String(node2)) || 0) + 1)
      }
    }
  }

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] !== '.') {
        antPos.set(map[i][j], [...(antPos.get(map[i][j]) || []), [i, j]])
      }
    }
  }

  const antennas = [...antPos.keys()];
  for (const a of antennas) {
    map_antinodes(a);
  }

  return nodePos.size;
}


function part_two(map: string[]): number {
  // Given:   An array of strings 'map' denoting antenna locations within a city.
  //          Antenna locations are denoted by a character [a-zA-Z0-9]. Non-antenna
  //          locations are denoted by the '.' character. Antennas are not able to
  //          function properly alone. Antennas require another antenna of the same
  //          frequency, denoted by its character, to emit its signal properly.
  //          When two Antennas of the same frequency exist in the same linear plane,
  //          this result is achieved. Many 'Antinodes' are then created at positions
  //          opposite one another such that the antennas are equally encapsolated
  //          between the two antinodes. Namely, antenna1 is equally far from
  //          antinode2 as antenna2 is from antinode1 (in this example, antinode1
  //          is the antinode closest to antenna1). Furthermore, these antinodes
  //          will resonate across the city until they hit the perimeter. 
  //          Antinodes are not physically placed, but instead inferred. 
  //          This means that an antenna can exist in the inferred position of an antinode.
  // 
  // Task:    Determine how many antinodes exist within the given map's perimeter
  //
  // Return:  The total number of unique locations within the map's perimeter that
  //          contain an antinode. (Antinodes can overlap on the same position)

  let antPos: Map<string, number[][]> = new Map<string, number[][]>();
  let nodePos: Map<string, number> = new Map<string, number>();

  const map_antinodes = (freq: string) => {
    const antList = antPos.get(freq)!

    for (let i = 0; i < antList.length; i++) {
      const ant1 = antList[i];
      nodePos.set(String(ant1), nodePos.get(String(ant1)) || 1)
      for (let j = i + 1; j < antList.length; j++) {
        const ant2 = antList[j];
        const v = ant2[0] - ant1[0];
        const h = ant2[1] - ant1[1];

        let node1 = [ant1[0] - v, ant1[1] - h];
        let node2 = [ant2[0] + v, ant2[1] + h];

        while (node1[0] >= 0
          && node1[0] < map[i].length
          && node1[1] >= 0
          && node1[1] < map.length) {
          nodePos.set(String(node1), (nodePos.get(String(node1)) || 0) + 1)
          node1 = [node1[0] - v, node1[1] - h];
        }

        while (node2[0] >= 0
          && node2[0] < map[i].length
          && node2[1] >= 0
          && node2[1] < map.length) {
          nodePos.set(String(node2), (nodePos.get(String(node2)) || 0) + 1)
          node2 = [node2[0] + v, node2[1] + h];
        }

      }
    }
  }

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] !== '.') {
        antPos.set(map[i][j], [...(antPos.get(map[i][j]) || []), [i, j]])
      }
    }
  }

  const antennas = [...antPos.keys()];
  for (const a of antennas) {
    map_antinodes(a);
  }

  return nodePos.size;
}

function main() {
  const input = fs.readFileSync('input', 'utf-8').split('\n');
  input.pop();

  console.log('Part one:', part_one(input));
  console.log('Part two:', part_two(input));
}

main();
