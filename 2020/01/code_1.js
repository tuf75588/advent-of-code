const fs = require('fs');

(function main() {
  try {
    const numbersInput = extractTextInput();
    const map_two = sequenceTwoForAddition(numbersInput);
    let a = sequenceForThree(numbersInput).reduce((a, b) => a * b);
    console.log(a);
  } catch (error) {
    console.error(error);
  }
})();

function extractTextInput() {
  return require('fs')
    .readFileSync(require('path').join(__dirname, 'input.txt'))
    .toString()
    .split('\n')
    .map((line) => Number(line));
}

function sequenceTwoForAddition(nums) {
  for (let i = 0; i < nums.length; i++) {
    let difference = 2020 - nums[i];
    if (nums.includes(difference)) {
      return nums[i] * difference;
    }
  }
}

// nested for loops for answer requiring three numbers

// this will need refactoring as I wager this computation is needlessly expensive
function sequenceForThree(array) {
  let diffs = [];
  let output = [];
  for (let i = 0; i < array.length - 2; i++) {
    for (let j = i + 1; j < array.length - 1; j++) {
      for (let k = j + 1; k < array.length; k++) {
        if (array[i] + array[j] + array[k] === 2020) {
          output.push(array[i], array[j], array[k]);
        }
      }
    }
  }
  return output;
}
