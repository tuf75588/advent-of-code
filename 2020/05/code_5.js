const sampleSeatingData = `
BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL
`;
//represents some integer between 1 and 7 inclusively

const legend = { B: 1, F: 0, R: 1, L: 0 };
// for each boarding pass

function processPass(pass) {
  // for each part, convert to binary (0's and 1's)
  // convert binary to decimal
  // get the seatId by combining these numbers
  return parseInt(
    pass.replace(/./g, (char) => (char in legend ? legend[char] : '')),
    2
  );
}

// find the seatIds that are spaced out by exactly 2
const inputPasses = extractInput();
const seatIds = inputPasses.map(processPass);
const maxId = Math.max(...seatIds);
/* 
PART 2
*/

function extractInput() {
  return require('fs')
    .readFileSync(require('path').join(__dirname, 'input.txt'))
    .toString()
    .split('\n')
    .map((line) => line);
}

const sortedSeatIds = [...seatIds].sort((a, b) => a - b);
const candidates = sortedSeatIds.filter((id, index) => {
  return sortedSeatIds[index + 1] - id === 2;
});
// make sure to add 1 for correct answer
