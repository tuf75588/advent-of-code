const { readFile } = require('fs/promises');
const path = require('path').join(__dirname, 'input.txt');
(async function init() {
  const input = await readFile(path, { encoding: 'utf-8' });
  const ws = /\s/g;
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
  
  b`;

  //array?
  const sample = sampleField
    .trim()
    .split('\n\n')
    .map((group) => group.split('\n').map((inner) => inner.trim()));
  const innerArray = sample[1].map((x) =>
    x.trim().replace(/./, (char) => {
      console.log(char);
    })
  );
})();
