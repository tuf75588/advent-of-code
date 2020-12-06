(function main(comboSize) {
  const COMBO_SIZE_TO_PRODUCT = new Map();
  COMBO_SIZE_TO_PRODUCT.set(2, getComboSizeTwo);
  COMBO_SIZE_TO_PRODUCT.set(3, getComboSizeThree);

  try {
    const nums = extractInput();
    const sizeTwo = buildLookupComboSizeTwo(nums);
    console.log(sizeTwo);
  } catch (error) {
    console.error(error);
  }
})();

function extractInput() {
  return require('fs')
    .readFileSync(require('path').join(__dirname, 'input.txt'))
    .toString()
    .split('\n')
    .map((line) => +line);
}

function buildLookupComboSizeTwo(nums) {
  return nums.reduce((acc, num) => ({ ...acc, [num]: 2020 - num }), {});
}

function buildLookupComboSizeThree(nums) {
  return nums.reduce(
    (acc, num) => ({
      ...acc,
      [num]: nums.reduce(
        (acc2, num2) => ({
          ...acc2,
          [nums2]: 2020 - num - num2,
        }),
        {}
      ),
    }),
    {}
  );
}
