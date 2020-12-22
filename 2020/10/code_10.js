const fs = require('fs');
const path = require('path').join(__dirname, 'input.txt');

const numbers = fs
  .readFileSync(path)
  .toString()
  .split('\n')
  .map((number) => +number);

numbers.sort((a, b) => a - b);

let diffs = numbers.map((number, i) => {
  if (i - 1 >= 0) {
    return number - numbers[i - 1];
  } else {
    return number;
  }
});

let ones = diffs.filter((num) => num === 1);
let threes = diffs.filter((num) => num === 3);
console.log(ones.length * threes.length);
