const { readInputFile } = require("../functions");

const scoreByShape = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};
const scoreByRoundOutcome = {
  WIN: 6,
  LOSS: 0,
  DRAW: 3,
};

const shapeByLetter = {
  A: "ROCK",
  B: "PAPER",
  C: "SCISSORS",
};
const outcomeByLetter = {
  X: "LOSS",
  Y: "DRAW",
  Z: "WIN",
};

const shapes = {
  ROCK: {
    win: "PAPER",
    loss: "SCISSORS",
  },
  PAPER: {
    win: "SCISSORS",
    loss: "ROCK",
  },
  SCISSORS: {
    win: "ROCK",
    loss: "PAPER",
  },
};

const resolveMyShape = (opponent, outcome) => {
  if (outcome === "WIN") {
    return shapes[opponent].win;
  } else if (outcome === "DRAW") {
    return opponent;
  } else {
    return shapes[opponent].loss;
  }
};

readInputFile(__dirname).then((input) => {
  const splitInput = input.split("\n");
  let result = 0;

  for (let index = 0; index < splitInput.length; index++) {
    const round = splitInput[index].split(" ");
    const opponent = shapeByLetter[round[0]];
    const outcome = outcomeByLetter[round[1]];

    const scoreFromMyShape = scoreByShape[resolveMyShape(opponent, outcome)];
    const scoreFromRoundOutcome = scoreByRoundOutcome[outcome];

    result += scoreFromMyShape + scoreFromRoundOutcome;
  }

  console.log(result);
});
