const field = [
  '..##.......',
  '#...#...#..',
  '.#....#..#.',
  '..#.#...#.#',
  '.#...##..#.',
  '..#.##.....',
  '.#.#.#....#',
  '.#........#',
  '#.##...#...',
  '#...##....#',
  '.#..#...#.#',
];

//! first solution

let [row, col] = [0, 0];
let count = 0;
const width = field[0].length;
while (row < field.length) {
  if (field[row][col] === '#') count++;
  row++;
  col = (col + 3) % width;
}

//! second solution

// function to find the numbers of trees on the field
const width2 = field[0].length;
function traverser(row = 0, col = 0) {
  if (row < field.length) {
    const optionalOne = field[row][col] === '#' ? 1 : 0;
    return traverser(row + 1, (col + 3) % width2) + optionalOne;
  } else {
    return 0;
  }
}
console.log(traverser());
