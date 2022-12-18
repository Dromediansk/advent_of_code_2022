const { readInputFile } = require("../functions");

const findIndicesOfMax = (input, count) => {
  var output = [];

  for (var i = 0; i < input.length; i++) {
    output.push(i); // add index to output array
    if (output.length > count) {
      output.sort((a, b) => {
        return input[b] - input[a];
      }); // descending sort the output array
      output.pop(); // remove the last index (index of smallest element in output array)
    }
  }
  return output;
};

readInputFile(__dirname).then((input) => {
  const splitInput = input.split("\n");
  const caloriesByPerson = {};
  let personCounter = 0;

  for (let index = 0; index < splitInput.length; index++) {
    const caloriesRecord = splitInput[index];

    if (caloriesRecord === "") {
      personCounter++;
      continue;
    }

    const caloriesAcc = caloriesByPerson[personCounter] ?? 0;
    caloriesByPerson[personCounter] = caloriesAcc + parseInt(caloriesRecord);
  }

  const allCalories = Object.values(caloriesByPerson);
  const maxCaloriesIndeces = findIndicesOfMax(allCalories, 3);

  const maxCalories = maxCaloriesIndeces.reduce((acc, index) => {
    acc += allCalories[index];
    return acc;
  }, 0);

  console.log(maxCalories);
});
