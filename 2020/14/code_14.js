const fs = require('fs');
const path = require('path');

let lines = fs
  .readFileSync(path.join(__dirname, 'input.txt'))
  .toString()
  .split('\n');

// Find the largest memory address and make an array of that size
let memorySlots = lines
  .filter((line) => line.startsWith('mem'))
  .map((line) => parseInt(line.split('mem[')[1].split(']')[0]));

memorySlots.sort((a, b) => b - a);

let memory = Array(memorySlots[0]);

let mask;

for (let line of lines) {
  if (line.startsWith('mask')) {
    mask = line.split('mask = ')[1];
  } else if (line.startsWith('mem')) {
    let [memIdx, memValue] = line.split(' = ');
    memIdx = +memIdx.slice(4, -1);
    memValue = +memValue;

    memory[memIdx] = bitmask(memValue, mask);
  }
}

console.log(memory);

console.log(
  memory.reduce((acc, curr) => {
    return acc + curr;
  })
);

function bitmask(memValue, mask) {
  let bin = memValue.toString(2).padStart(36, '0');

  let str = '';

  for (let i = bin.length - 1; i >= 0; i--) {
    if (mask[i] === 'X') {
      str += bin[i];
    } else {
      str += mask[i];
    }
  }

  str = str.split('').reverse().join('');

  return parseInt(str, 2);
}
