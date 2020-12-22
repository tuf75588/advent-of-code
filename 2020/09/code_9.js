const fs = require('fs');
const path = require('path').join(__dirname, 'input.txt');

(function main() {
  const input = fs
    .readFileSync(path)
    .toString()
    .split('\n')
    .map((line) => parseInt(line));

  const [idx, invalidNumber] = findInvalidNumber(input, 25);
  let set = findContiguousSet(input.slice(0, idx), invalidNumber);
  set.sort();
  console.log(set[0] + set[set.length - 1]);
})();

function arrayOverlap(arr1, arr2) {
  return arr1.filter((item) => arr2.includes(item));
}

function findInvalidNumber(numbers, prevSize) {
  for (let i = prevSize; i < numbers.length; i++) {
    let prevNumbers = numbers.slice(i - prevSize, i);

    let prevNumberDiffs = prevNumbers.map((prevNum) => {
      return numbers[i] - prevNum;
    });

    if (arrayOverlap(prevNumbers, prevNumberDiffs).length === 0) {
      return [i, numbers[i]];
    }
  }
}
function findContiguousSet(numbers, sumNum) {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i; j < numbers.length; j++) {
      let slice = numbers.slice(i, j + 1);

      sum = slice.reduce((a, b) => a + b);
      if (sum === sumNum) {
        return slice;
      }
    }
  }
}
