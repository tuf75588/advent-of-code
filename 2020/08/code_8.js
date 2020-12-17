const fs = require('fs/promises');
const { get } = require('http');
const path = require('path').join(__dirname, 'input.txt');
const sample = `
nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6
`;

(async function main() {
  const input = await fs.readFile(path, { encoding: 'utf-8' });
  console.log(input);
  const sampleInstructions = sample.trim().split('\n');
  const getCount = (instruction) => {
    let accumulator = 0;
    let index = 0;
    const visited = new Set();
    while (!visited.has(index)) {
      visited.add(index);
      // process each instruction
      const instructionSegment = /(nop|acc|jmp) ([+-]\d+)/;
      // each instruction & the amount of instruction
      const [_, type, numString] = instruction[index].match(instructionSegment);
      const num = parseInt(numString);
      if (type === 'acc') {
        accumulator += num;
        index++;
      } else if (type === 'jmp') {
        index += num;
      } else {
        index++;
      }
    }
    return accumulator;
  };
  console.log(getCount(input.trim().split('\n')));
})();
