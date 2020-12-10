const fs = require('fs');
function main() {
  const passwords = extractData();
  let transform;
  transform = passwords.map((element, index) => {
    const { sequence } = element;
    // first part
    const transforms = sequence
      .map((letter, i) => ({ letter, pos: i + 1 }))
      .filter((obj) => obj.letter === element.letter);
    return transforms.filter((x) => {
      return x.pos === element.min || x.pos === element.max;
    });
  });
  const final = transform.filter((item) => item.length === 1);
  console.log(final.length);
}
function extractData() {
  return fs
    .readFileSync(require('path').join(__dirname, 'input.txt'))
    .toString()
    .split('\n')
    .map((line) => {
      let [minMax, letter, sequence] = line.split(' ');
      const minMaxFormat = minMax.split('-');
      return {
        min: Number(minMaxFormat[0]),
        max: Number(minMaxFormat[1]),
        letter: letter.replace(':', ''),
        sequence: sequence.split(''),
      };
    });
}

function checkForValid(inputArray) {
  return [...inputArray].reduce((acc, curr) => {
    if (acc[curr] === undefined) {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }
    return acc;
  }, {});
}

main();
