function extractInput() {
  return require('fs')
    .readFileSync(require('path').join(__dirname, 'input.txt'))
    .toString()
    .split('\n')
    .map((line) => line);
}

// just some sample data to make sure our fns work
const testField = [
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
const testWidth = testField[0].length;
while (row < testField.length) {
  if (testField[row][col] === '#') count++;
  row++;
  col = (col + 3) % testWidth;
}

//! second solution

// function to find the numbers of trees on the field

// function traverser(dRow, dCol, row = 0, col = 0) {
//   if (row < testField.length) {
//     const optionalOne = testField[row][col] === '#' ? 1 : 0;
//     return (
//       traverser(dRow, dCol, row + dRow, (col + dCol) % width) + optionalOne
//     );
//   } else {
//     return 0;
//   }
// }

/* 
PART TWO
*/
// to accommodate this part I will add two new params to traverser function: dRow, dCol (delta)
const directions = [
  [1, 1],
  [1, 3],
  [1, 5],
  [1, 7],
  [2, 1],
];

const field = extractInput();
const width = field[0].length;
function generateTraverser(dRow, dCol) {
  return function traverser(row = 0, col = 0) {
    if (row < field.length) {
      const optionalOne = field[row][col] === '#' ? 1 : 0;
      return traverser(row + dRow, (col + dCol) % width) + optionalOne;
    } else {
      return 0;
    }
  };
}

const treeCounts = directions.map(([dRow, dCol]) =>
  generateTraverser(dRow, dCol)()
);

// big hecking number here will be solution - 2224913600
const generateProduct = treeCounts.reduce(
  (num, currentNum) => num * currentNum,
  1
);
