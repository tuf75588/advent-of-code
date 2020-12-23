const fs = require('fs');
const path = require('path').join(__dirname, 'input.txt');
let input = fs
  .readFileSync(path, 'utf-8')
  .split('\n')
  .map((x) => Number(x))
  .sort((a, b) => a - b);

// Part1
let diff = [0, 0, 1];
for (let i = 0; i < input.length; i++) {
  diff[input[i] - input[i - 1] - 1 || 0]++;
}

console.log(`Part 1: ${diff[0] * diff[2]}`);

// Part 2
let combinations = input
  .reduce(
    (a, b) => {
      a[b] = (a[b - 3] || 0) + (a[b - 2] || 0) + (a[b - 1] || 0);
      return a;
    },
    [1]
  )
  .pop();

console.log(`Part 2: ${combinations}`);
