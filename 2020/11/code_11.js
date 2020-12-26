const fs = require('fs');
const path = require('path');

let rows = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString()
  .split('\n');

const sampleInput = `
L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
`;

function step(rows) {
  let newRows = new Array(rows.length).fill('');
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (rows[i][j] === '.') {
        newRows[i] += '.';
      } else if (rows[i][j] === 'L') {
        newRows[i] += noAdjacentSeats(rows, i, j);
      } else if (rows[i][j] === '#') {
        newRows[i] += fourOrMore(rows, i, j);
      }
    }
  }
  return newRows;
}

function noAdjacentSeats(rows, i, j) {
  let takenSeats = 0;
  for (let iAdd = -1; iAdd < 2; iAdd++) {
    for (let jAdd = -1; jAdd < 2; jAdd++) {
      if (iAdd === 0 && jAdd === 0) continue;
      if (i + iAdd === -1 || j + jAdd === -1) continue;
      if (i + iAdd === rows.length || j + jAdd === rows[0].length) continue;
      let adjSeat = rows[i + iAdd][j + jAdd];
      if (adjSeat !== undefined) {
        if (adjSeat === '#') {
          takenSeats++;
        }
      }
    }
  }
  if (takenSeats === 0) {
    return '#';
  } else {
    return rows[i][j];
  }
}

function fourOurMore(rows, i, j) {
  let takenSeats = 0;
  for (let iAdd = -1; iAdd < 2; iAdd++) {
    for (let jAdd = -1; jAdd < 2; jAdd++) {
      if (iAdd === 0 && jAdd === 0) continue;
      if (i + iAdd === -1 || j + jAdd === -1) continue;
      if (i + iAdd === rows.length || j + jAdd === rows[0].length) continue;
      let adjSeat = rows[i + iAdd][j + jAdd];
      if (adjSeat !== undefined) {
        if (adjSeat === '#') {
          takenSeats++;
        }
      }
    }
  }

  if (takenSeats >= 4) {
    return 'L';
  } else {
    return rows[i][j];
  }
}

while (true) {
  let newRows = step(rows);

  if (rows.join('') === newRows.join('')) {
    break;
  } else {
    rows = newRows;
  }
}
