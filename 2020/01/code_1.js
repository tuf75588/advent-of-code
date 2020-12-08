(function main() {
  try {
    const numbersInput = extractTextInput();
    const map_two = sequenceTwoForAddition(numbersInput);
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
