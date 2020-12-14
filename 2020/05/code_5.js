const sampleSeatingData = `
BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL
`;
//represents some integer between 1 and 7 inclusively
const colLegend = { R: 1, L: 0 };
const rowLegend = { B: 1, F: 0 };
const passes = responseText.trim().split('\n');
// for each boarding pass

function processPass(pass) {
  const rowPart = pass.slice(0, 7);
  const colPart = pass.slice(7);
  // for each part, convert to binary (0's and 1's)
  const colBinary = colPart.replace(/./g, (char) =>
    char in colLegend ? colLegend[char] : ''
  );
  const rowBinary = rowPart.replace(/./g, (char) =>
    char in rowLegend ? rowLegend[char] : ''
  );
  // convert binary to decimal
  let rowDecimal = parseInt(rowBinary, 2);
  let colDecimal = parseInt(colBinary, 2);
  // get the seatId by combining these numbers
  return { rowDecimal, colDecimal };
}

const seatIds = passes.map((x) => {
  const obj = processPass(x);
  const { rowDecimal, colDecimal } = obj;
  const product = rowDecimal * 8 + colDecimal;
  return product;
});

let maxId = Math.max(...seatIds);
