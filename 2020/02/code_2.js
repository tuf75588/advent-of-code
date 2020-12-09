(async function main() {
  const fs = await require('fs');
  const passwords = extractData();
  const check = passwords
    .map((line, i) => {
      const count = line.sequence[line.letter];

      if (count >= line.min && count <= line.max && count !== undefined) {
        return { ...line, valid: true };
      }
      return { ...line, valid: false };
    })
    .filter((x) => x.valid === true).length;
  console.log(check);
})();

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
        sequence: checkForValid(sequence),
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
