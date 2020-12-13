const sampleSeatingData = `
BFFFBBFRRR
FFFBBBFRRR
BFFFBBFRRR
`;
//represents some integer between 1 and 7 inclusively
let responseText = sampleSeatingData;
const passes = responseText.trim().split('\n');
// for each boarding pass

function processPass(pass) {
  const rowPart = passes.slice(0, 7);
  const colPart = passes.slice(7);
}

// divide it into row and col parts
const firstHalf = sampleSeatingData.slice(0, 7);
const lastHalf = sampleSeatingData.slice(-4);

// for each part, convert to binary (0's and 1's)

// convert binary to decimal

// get the seatId by combining the numbers
