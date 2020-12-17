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

  const runProgram = (instructions, index = 0, visited = new Set()) => {
    const { type, num } = instructions[index];
    const nextVisited = new Set([...visited, index]);

    return visited.has(index)
      ? 0
      : type === 'acc'
      ? num + runProgram(instructions, index + 1, nextVisited)
      : type === 'jmp'
      ? runProgram(instructions, index + num, nextVisited)
      : runProgram(instructions, index + 1, nextVisited);
  };
  console.log(runProgram(instructions));
})();
