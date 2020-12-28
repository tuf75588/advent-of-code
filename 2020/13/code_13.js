const fs = require('fs');
const path = require('path').join(__dirname, 'input.txt');

const sequence = fs.readFileSync(path).toString().split('\n');

let startTimeStamp = Number(sequence[0]);

let buses = sequence[1]
  .split(',')
  .filter((busNumber) => busNumber !== 'x')
  .map((number) => parseInt(number));

let start = buses.map((bus) => {
  return bus * Math.floor(startTimeStamp / bus);
});

let newState = start.map((bus, index) => {
  return bus + buses[index];
});

const minimum = Math.min(...newState);

let id = buses[newState.findIndex((bus) => bus === minimum)];

let difference = minimum - startTimeStamp;

console.log(id * difference);
