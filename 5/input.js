const fs = require("fs");
const path = require("path");

const [rawStacks, rawInstructions] = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .split("\n\n");

const CRATE_SIZE = "[X]".length;
const rawStackLines = rawStacks.split("\n");
// Remove last line of " 1   2   3   4   5   6   7   8   9 "
rawStackLines.pop();
console.log(rawStackLines);

const stacks = [];

for (let rawStackLine of rawStackLines) {
  for (let i = 0; i < rawStackLine.length; i += CRATE_SIZE + 1) {
    const start = i;
    const end = start + CRATE_SIZE;
    const crate = rawStackLine.substring(start, end);

    const stackIndex = i / (CRATE_SIZE + 1);
    if (!stacks[stackIndex]) {
      stacks[stackIndex] = [];
    }
    if (crate.trim()) {
      // "[X]" -> "X"
      stacks[stackIndex].push(crate.substring(1, 2));
    }
  }
}

for (let stack of stacks) {
  stack.reverse();
}

// Parse move instructions
const instructions = rawInstructions.split("\n").map((line) => {
  // e.g. `move 13 from 3 to 6`
  let [, count, from, to] = /move (\d+) from (\d+) to (\d+)/.exec(line);
  count = parseInt(count, 10);
  // Stacks are 0-indexed
  from = parseInt(from, 10) - 1;
  to = parseInt(to, 10) - 1;

  return { count, from, to };
});

module.exports = {
  input: {
    stacks,
    instructions,
  },
};
