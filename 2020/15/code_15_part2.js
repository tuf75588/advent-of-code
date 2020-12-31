const input = [2, 20, 0, 4, 1, 17];

let lastArray = new Array(30000000).fill(0);

for (let i = 0; i < input.length; i++) {
  lastArray[input[i]] = i + 1;
}
let len = input.length;

let previousNumber = input[input.length - 1];

while (true) {
  let lastIndex = lastArray[previousNumber];
  if (lastIndex !== 0) {
    let spokenNum = len - lastIndex;
    lastArray[previousNumber] = len;
    previousNumber = spokenNum;
  } else {
    lastArray[previousNumber] = len;
    previousNumber = 0;
  }
  len += 1;
  if (len === 2020 || len === 30000000) {
    console.log({ len, previousNumber });
    if (len === 30000000) {
      break;
    }
  }
}
