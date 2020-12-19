const fs = require('fs/promises');
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
  const sampleInstructions = sample.trim().split('\n');
  const instructions = input
    .trim()
    .split('\n')
    .map((instruction) => {
      const instructionSegment = /(nop|acc|jmp) ([+-]\d+)/;
      // each instruction & the amount of instruction
      const [_, type, numString] = instruction.match(instructionSegment);
      const num = parseInt(numString);
      return {
        type,
        num,
      };
    });

  const runProgram = (
    instructions,
    accumulator = 0,
    index = 0,
    visited = new Set()
  ) => {
    const { type, num } = instructions[index] ?? {};
    const nextVisited = new Set([...visited, index]);

    return visited.has(index)
      ? -1
      : index === instructions.length
      ? accumulator
      : type === 'acc'
      ? runProgram(instructions, accumulator + num, index + 1, nextVisited)
      : type === 'jmp'
      ? runProgram(instructions, accumulator, index + num, nextVisited)
      : runProgram(instructions, accumulator, index + 1, nextVisited);
  };

  for (let i = 0; i < instructions.length; i++) {
    const { type, num } = instructions[i];
    if (type === 'nop') {
      const newInstructions = [...instructions];
      newInstructions[i] = { type: 'jmp', num };
      console.log(runProgram(newInstructions));
    } else if (type === 'jmp') {
      const newInstructions = [...instructions];
      newInstructions[i] = { type: 'nop', num };
      console.log(runProgram(newInstructions));
    }
  }
})();
