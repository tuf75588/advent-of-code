const fs = require('fs');
const path = require('path');

let lines = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString()
  .split('\n');

// The max index for part 2 was larger than 4 billion (max 32 bit int size) so I swapped to a map
let memory = {};

let mask;

for (let line of lines) {
  if (line.startsWith('mask')) {
    mask = line.split('mask = ')[1];
  } else if (line.startsWith('mem')) {
    let [memIdx, memValue] = line.split(' = ');
    memIdx = +memIdx.slice(4, -1);
    memValue = +memValue;

    let locations = bitmask(memIdx, mask);

    for (let i = 0; i < locations.length; i++) {
      memory[locations[i]] = memValue;
    }
  }
}

console.log(Object.values(memory).reduce((acc, curr) => acc + curr));

function bitmask(memValue, mask) {
  let bin = memValue.toString(2).padStart(36, '0');

  let locations = [];

  let str = '';

  // Apply the mask to the memory address
  for (let i = bin.length - 1; i >= 0; i--) {
    if (mask[i] === '0') {
      str += bin[i];
    } else if (mask[i] === '1') {
      str += '1';
    } else {
      str += 'X';
    }
  }
  str = str.split('').reverse().join('');

  let floatingBits = str.split('').filter((ch) => ch === 'X').length;

  let combinations = 2 ** floatingBits;

  // Create each combination of binary number between 0 and combinations (2^floatingBits)
  for (let i = 0; i < combinations; i++) {
    let nums = i.toString(2).padStart(floatingBits, '0').split('');
    let xNum = 0;

    let str_ = '';

    // Create a new string that replaces each X sequentially with the position in the binary number
    for (let j = 0; j < str.length; j++) {
      if (str[j] === 'X') {
        str_ += nums[xNum];
        xNum++;
      } else {
        str_ += str[j];
      }
    }

    locations.push(parseInt(str_, 2));
  }

  return locations;
}
