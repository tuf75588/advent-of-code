const fs = require('fs');
const path = require('path').join(__dirname, 'input.txt');

const directions = fs.readFileSync(path).toString().split('\n');

let xWaypoint = 10;
let yWaypoint = 1;

let x = 0;
let y = 0;

directions.forEach((direction) => {
  const value = Number(direction.slice(1));
  let degree = value / 90;
  switch (direction[0]) {
    case 'N': {
      yWaypoint += value;
      break;
    }
    case 'S': {
      yWaypoint -= value;
      break;
    }
    case 'E': {
      xWaypoint += value;
      break;
    }
    case 'W': {
      xWaypoint -= value;
      break;
    }
    case 'L': {
      while (degree) {
        [xWaypoint, yWaypoint] = [-yWaypoint, xWaypoint];
        degree--;
      }
      break;
    }
    case 'R': {
      while (degree) {
        [xWaypoint, yWaypoint] = [yWaypoint, -xWaypoint];
        degree--;
      }
      break;
    }
    case 'F': {
      x += value * xWaypoint;
      y += value * yWaypoint;
      break;
    }
  }
});
console.log('Final Location:', x, y);
console.log('Distance:', Math.abs(x) + Math.abs(y));
