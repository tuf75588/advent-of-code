const input = [2, 20, 0, 4, 1, 17];

for (let i = 6; i < 2020; i++) {
  let lastNumber = input[i - 1];
  let newNumber;
  let idx = input.lastIndexOf(lastNumber, i - 2);
  if (idx == -1) {
    newNumber = 0;
  } else {
    newNumber = i - (idx + 1);
  }
  console.log({ lastNumber, newNumber, idx });
  input.push(newNumber);
  console.log(i, input[i]);
}
