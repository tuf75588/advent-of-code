const fs = require('fs');
const path = require('path').join(__dirname, 'input.txt');

const directions = fs.readFileSync(path).toString().split('\n');

let faces = ['N', 'E', 'S', 'W'];

let directionsParse = {
  N: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: -1 },
  W: { x: -1, y: 0 },
};

let x = 0;
let y = 0;
let dir = 'E';
let directionIndex = 1;

directions.forEach((direction) => {
  const value = Number(direction.slice(1));
  const degree = value / 90;
  switch (direction[0]) {
    case 'N': {
      y += value;
      break;
    }
    case 'S': {
      y -= value;
      break;
    }
    case 'E': {
      x += value;
      break;
    }
    case 'W': {
      x -= value;
      break;
    }
    case 'L': {
      directionIndex += 4 - degree;
      dir = faces[directionIndex % 4];
      break;
    }
    case 'R': {
      directionIndex += degree;
      dir = faces[directionIndex % 4];
      break;
    }
    case 'F': {
      x += directionsParse[dir].x * value;
      y += directionsParse[dir].y * value;
      break;
    }
  }
});
console.log('Final Location:', x, y);
console.log('Distance:', Math.abs(x) + Math.abs(y));
