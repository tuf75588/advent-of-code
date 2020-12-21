const fs = require('fs');
const path = require('path').join(__dirname, 'input.txt');

(function main() {
  const input = fs
    .readFileSync(path)
    .toString()
    .split('\n')
    .map((line) => +line);
  console.log(findInvalidNumbers(input, 25));
  const [index, invalidNumber] = findInvalidNumbers(input, 25);
  let set = findContiguousSet(input.slice(0, 25), invalidNumber);
  set.sort();
})();

function arrayOverlap(arr1, arr2) {
  return arr1.filter((item) => arr2.includes(item));
}

function findInvalidNumbers(numbers, previousSize) {
  for (let i = previousSize; i < numbers.length; i++) {
    let previousNumbers = numbers.slice(i - previousSize, i);

    let previousNumbersDifference = previousNumbers.map((prevNum) => {
      return numbers[i] - prevNum;
    });
    if (arrayOverlap(previousNumbers, previousNumbersDifference).length === 0) {
      return numbers[i];
    }
  }
}
function findContiguousSet(numbers, sumNumbers) {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      let slice = numbers.slice(i, j + 1);
      let sum;
      sum = slice.reduce((a, b) => a + b);
      if (sum === sumNumbers) {
        return slice;
      }
    }
  }
}
