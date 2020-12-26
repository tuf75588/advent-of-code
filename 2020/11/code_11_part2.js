const fs = require('fs');
const path = require('path');

let rows = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString()
  .split('\n');

// let rows = `L.LL.LL.LL
// LLLLLLL.LL
// L.L.L..L..
// LLLL.LL.LL
// L.LL.LL.LL
// L.LLLLL.LL
// ..L.L.....
// LLLLLLLLLL
// L.LLLLLL.L
// L.LLLLL.LL`.split("\n");

function step(rows) {
  let newRows = Array(rows.length).fill('');

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (rows[i][j] === '.') {
        newRows[i] += '.';
      } else if (rows[i][j] === 'L') {
        newRows[i] += noAdjacentSeats(rows, i, j);
      } else if (rows[i][j] === '#') {
        newRows[i] += fiveOrMore(rows, i, j);
      }
    }
  }

  return newRows;
}

function noAdjacentSeats(rows, i, j) {
  let takenSeats = 0;

  // top-left -1 -1
  // top -1 0
  // top-right -1 1
  // left 0 -1
  // right 0 1
  // bottom-left 1 -1
  // bottom 1 0
  // bottom-right 1 1

  for (let iAdd = -1; iAdd < 2; iAdd++) {
    for (let jAdd = -1; jAdd < 2; jAdd++) {
      let i_ = i;
      let j_ = j;
      if (iAdd === 0 && jAdd === 0) continue;

      innerLoop: while (true) {
        if (i_ + iAdd === -1 || j_ + jAdd === -1) break innerLoop;
        if (i_ + iAdd === rows.length || j_ + jAdd === rows[0].length)
          break innerLoop;
        let adjSeat = rows[i_ + iAdd][j_ + jAdd];
        if (adjSeat !== undefined) {
          if (adjSeat === '#') {
            takenSeats++;
            break innerLoop;
          } else if (adjSeat === 'L') {
            break innerLoop;
          } else if (adjSeat === '.') {
            i_ += iAdd;
            j_ += jAdd;
          }
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

function fiveOrMore(rows, i, j) {
  let takenSeats = 0;

  // top-left -1 -1
  // top -1 0
  // top-right -1 1
  // left 0 -1
  // right 0 1
  // bottom-left 1 -1
  // bottom 1 0
  // bottom-right 1 1

  for (let iAdd = -1; iAdd < 2; iAdd++) {
    for (let jAdd = -1; jAdd < 2; jAdd++) {
      let i_ = i;
      let j_ = j;
      if (iAdd === 0 && jAdd === 0) continue;

      innerLoop: while (true) {
        if (i_ + iAdd === -1 || j_ + jAdd === -1) break innerLoop;
        if (i_ + iAdd === rows.length || j_ + jAdd === rows[0].length)
          break innerLoop;
        let adjSeat = rows[i_ + iAdd][j_ + jAdd];
        if (adjSeat !== undefined) {
          if (adjSeat === '#') {
            takenSeats++;
            break innerLoop;
          } else if (adjSeat === 'L') {
            break innerLoop;
          } else if (adjSeat === '.') {
            i_ += iAdd;
            j_ += jAdd;
          }
        }
      }
    }
  }

  if (takenSeats >= 5) {
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

console.log(
  rows
    .join('')
    .split('')
    .filter((spot) => spot === '#').length
);
