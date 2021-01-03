const fs = require('fs');
const path = require('path').join(__dirname, 'input.txt');
const lines = fs.readFileSync(path).toString();
console.log(lines);
const iterAmt = 6;
// make a list of points to add at first
let startPoints = [];
// could do forEach() instead of map() but i already did it like this and it works
startGrid = lines.split('\n').map((line, y) =>
  line.split('').map((point, x) => {
    if (point == '#') {
      startPoints.push([iterAmt + x, iterAmt + y, iterAmt, iterAmt]);
    }
    return point == '#';
  })
);
// start with zero active cubes
let runningTotal = 0;
// create an empty pocket dimension
let p = new Pocket();
// add the points from the input

startPoints.forEach((point) => add(...point, p));

for (let i = 0; i < iterAmt; i++) {
  printLayer(p, iterAmt, iterAmt);

  let next = p.map((slice) =>
    slice.map((layer) =>
      layer.map((row) =>
        row.map((cube) => {
          return { active: cube.active, nearby: cube.nearby };
        })
      )
    )
  );

  p.forEach((slice, w) =>
    slice.forEach((layer, z) =>
      layer.forEach((row, y) =>
        row.forEach((cube, x) => {
          if (cube.active && (cube.nearby < 2 || cube.nearby > 3)) {
            remove(x, y, z, w, p, next);
          } else if (!cube.active && cube.nearby == 3) {
            add(x, y, z, w, p, next);
          }
        })
      )
    )
  );

  p = next;
}

console.log(runningTotal);

// -------------------------------
function printLayer(pocket, slice, layer) {
  console.log(
    pocket[slice][layer].reduce(
      (a, b) =>
        a +
        b.reduce(
          (c, d) =>
            c +
            (d.active ? '\x1b[36m' : '\x1b[0m') +
            (d.nearby.toString().length == 1 ? '0' : '') +
            d.nearby,
          ''
        ) +
        '\n',
      ''
    )
  );
}

// returns empty pocket dimension

function Pocket() {
  let pocket = [];
  for (let w = 0; w < iterAmt * 2 + 1; w++) {
    let slice = [];
    for (let z = 0; z < iterAmt * 2 + 1; z++) {
      let layer = [];
      for (let y = 0; y < iterAmt * 2 + startGrid.length; y++) {
        let row = [];
        for (let x = 0; x < iterAmt * 2 + startGrid[0].length; x++) {
          row.push({ active: false, nearby: 0 });
        }
        layer.push(row);
      }
      slice.push(layer);
    }
    pocket.push(slice);
  }
  return pocket;
}

function add(x, y, z, w, before, after = before) {
  if (before[w][z][y][x].active) return before;
  runningTotal++;
  after[w][z][y][x].active = true;
  for (
    let slice = Math.max(w - 1, 0);
    slice <= Math.min(w + 1, before.length - 1);
    slice++
  ) {
    for (
      let layer = Math.max(z - 1, 0);
      layer <= Math.min(z + 1, before[0].length - 1);
      layer++
    ) {
      for (
        let row = Math.max(y - 1, 0);
        row <= Math.min(y + 1, before[0][0].length - 1);
        row++
      ) {
        for (
          let col = Math.max(x - 1, 0);
          col <= Math.min(x + 1, before[0][0][0].length - 1);
          col++
        ) {
          if (slice == w && layer == z && row == y && col == x) continue;
          after[slice][layer][row][col].nearby++;
        }
      }
    }
  }
  return after;
}

function remove(x, y, z, w, before, after = before) {
  if (!before[w][z][y][x].active) return before;
  runningTotal--;
  after[w][z][y][x].active = false;
  for (
    let slice = Math.max(w - 1, 0);
    slice <= Math.min(w + 1, before.length - 1);
    slice++
  ) {
    for (
      let layer = Math.max(z - 1, 0);
      layer <= Math.min(z + 1, before[0].length - 1);
      layer++
    ) {
      for (
        let row = Math.max(y - 1, 0);
        row <= Math.min(y + 1, before[0][0].length - 1);
        row++
      ) {
        for (
          let col = Math.max(x - 1, 0);
          col <= Math.min(x + 1, before[0][0][0].length - 1);
          col++
        ) {
          if (slice == w && layer == z && row == y && col == x) continue;
          after[slice][layer][row][col].nearby--;
        }
      }
    }
  }
  return after;
}
