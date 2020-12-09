const fs = require('fs');
function extractData() {
  return fs
    .readFileSync(require('path').join(__dirname, 'input.txt'))
    .toString()
    .split('\n')
    .map((line) => {
      let [minMax, letter, sequence] = line.split(' ');
      return {
        minMax,
        letter,
        sequence,
      };
    });
}
