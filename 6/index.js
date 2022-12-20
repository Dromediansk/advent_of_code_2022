const { readInputFile } = require("../functions");

readInputFile(__dirname).then((data) => {
  const input = data.split("");

  let characters = "";
  let lastDifferentCharIndex;

  for (let index = 0; index < input.length; index++) {
    const character = input[index];

    if (characters.includes(character)) {
      characters = characters.substring(characters.indexOf(character) + 1);
      characters += character;
      continue;
    }

    characters += character;
    if (characters.length === 14) {
      lastDifferentCharIndex = index + 1;
      break;
    }
  }
  console.log(lastDifferentCharIndex);
});
