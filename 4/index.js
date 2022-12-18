const { readInputFile } = require("../functions");

const formatPair = (pair) => {
  const [low, high] = pair.split("-");
  return [parseInt(low), parseInt(high)];
};

readInputFile(__dirname).then((input) => {
  const splitInput = input.split("\n");

  let overlapPairs = 0;

  for (let index = 0; index < splitInput.length; index++) {
    const pairs = splitInput[index].split(",");
    const [firstPairLow, firstPairHigh] = formatPair(pairs[0]);
    const [secondPairLow, secondPairHigh] = formatPair(pairs[1]);

    // fully contains
    if (
      (secondPairLow >= firstPairLow && secondPairHigh <= firstPairHigh) ||
      (firstPairLow >= secondPairLow && firstPairHigh <= secondPairHigh)
    ) {
      overlapPairs++;
      continue;
    }

    // 2,8 - 4,9 - secondLow is bigger or equal to low/high of the first
    if (secondPairLow >= firstPairLow && secondPairLow <= firstPairHigh) {
      overlapPairs++;
      continue;
    }

    // 7,10 - 2,8 - secondHigh is bigger or equal to low/high of the first
    if (secondPairHigh >= firstPairLow && secondPairHigh <= firstPairHigh) {
      overlapPairs++;
      continue;
    }
  }
  console.log(overlapPairs);
});
