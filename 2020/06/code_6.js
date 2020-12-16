const { readFile } = require('fs/promises');
const path = require('path').join(__dirname, 'input.txt');
(async function init() {
  const input = await readFile(path, { encoding: 'utf-8' });
  const sampleField = `
  abc

  a
  b
  c

  ab
  ac

  a
  a
  a
  a

  b
  `;
  //array?
  const groups = input
    .trim()
    .split('\n\n')
    .map((group) => group.split('\n'));
  const letterCount = groups.map(countLetters).reduce((a, b) => a + b, 0);
  // answer is 6578

  let letterCount2 = groups.map(countLetter2);
  const partTwo = groups.map(countLetters3).reduce((a, b) => a + b);
  console.log(partTwo);
})();

/** @param string[] group - individual array element full of strings */

function countLetters(group) {
  const letterSet = new Set();
  for (const char of group) {
    for (const row of char) {
      letterSet.add(row);
    }
  }
  letterSet.forEach((set) => {
    if (set === ' ') {
      letterSet.delete(' ');
    }
  });
  return letterSet.size;
}

/* alternative solution */

function countLetter2(group) {
  const sets = group.map((line) => new Set(line));
  return [...'abcdefghijklmnopqrstuvwxyz'].filter((line) =>
    sets.some((x) => x.has(line))
  );
}

/* PART 2 */

function countLetters3(group) {
  const sets = group.map((line) => new Set(line));
  return [...'abcdefghijklmnopqrstuvwxyz'].filter((line) =>
    sets.every((x) => x.has(line))
  ).length;
}
