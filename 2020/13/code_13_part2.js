const fs = require('fs');
const path = require('path').join(__dirname, 'input.txt');

const sequence = fs.readFileSync(path).toString().split('\n');

let buses = sequence[1]
  .split(',')
  .map((num, idx) => ({ num, idx }))
  .filter(({ num }) => num !== 'x')
  .map(({ num, idx }) => ({ num: parseInt(num), idx }));

let earliestTime = 0;
let prod = 1;

for (let i = 0; i < buses.length; i++) {
  while ((earliestTime + buses[i].idx) % buses[i].num !== 0) {
    earliestTime += prod;
  }
  prod *= buses[i].num;
}

console.log(earliestTime);
