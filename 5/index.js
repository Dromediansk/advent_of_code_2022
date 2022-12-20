const {
  input: { stacks, instructions },
} = require("./input");

for (let { count, from, to } of instructions) {
  let groupCrates = stacks[from].splice(-1 * count, count);
  stacks[to].push(...groupCrates);
}

const topCrates = stacks.map((stack) => stack[stack.length - 1]).join("");
console.log(topCrates);
