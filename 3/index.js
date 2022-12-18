const { readInputFile } = require("../functions");

const populateLetterLookup = (stringSet) => {
  let lookup = {};

  Array.from(stringSet).forEach((string) => {
    lookup[string] = 1;
  });
  return lookup;
};

const getLetterPriority = (letter) => {
  // Check if the letter is a lowercase letter
  if (letter >= "a" && letter <= "z") {
    // Return the index of the letter in the alphabet (1-26)
    return letter.charCodeAt(0) - "a".charCodeAt(0) + 1;
  } else if (letter >= "A" && letter <= "Z") {
    // Return the index of the letter in the alphabet (27-52)
    return letter.charCodeAt(0) - "A".charCodeAt(0) + 27;
  } else {
    // Return -1 if the input is not a letter
    return -1;
  }
};

readInputFile(__dirname).then((input) => {
  const splitInput = input.split("\n");
  let groupId = 1;
  const groups = {};

  let totalPriority = 0;

  for (let index = 0; index < splitInput.length; index++) {
    const line = new Set(splitInput[index]);

    const groupById = groups[groupId];

    if (!groupById) {
      groups[groupId] = {
        lines: [line],
        lookup: populateLetterLookup(line),
      };
      continue;
    } else {
      groupById.lines.push(line);
    }

    if (groupById.lines.length === 3) {
      const commonLetter = Array.from(groupById.lines[0]).find(
        (item) => groupById.lines[1].has(item) && groupById.lines[2].has(item)
      );
      const letterPriority = getLetterPriority(commonLetter);
      totalPriority += letterPriority;

      groupId++;
    }
  }
  console.log(totalPriority);
});
