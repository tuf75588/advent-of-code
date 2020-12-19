const fs = require('fs');
const path = require('path').join(__dirname, 'input.txt');

(function main() {
  const input = fs
    .readFileSync(path)
    .toString()
    .split('\n')
    .map((line) => +line);
})();

function arrayOverlap(arr1, arr2) {
  return arr1.filter((item) => arr2.includes(item));
}

function findInvalidNumbers(numbers, previousSize) {
  for (let i = previousSize; i < numbers.length; i++) {
    let previousNumbers = numbers.slice(i - previousSize, i);
  }
}
