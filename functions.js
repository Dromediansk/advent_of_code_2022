const fs = require("fs/promises");
const path = require("path");

const readInputFile = async (dirname, filename = "input.txt") => {
  try {
    const input = await fs.readFile(path.join(dirname, filename), {
      encoding: "utf-8",
    });
    return input;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  readInputFile,
};
