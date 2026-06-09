import * as readlineSync from "readline-sync";

function getInt(promptText: string): number {
  return readlineSync.questionInt(promptText);
}

let height: number;

while (true) {
  height = getInt("Height: ");

  // Checking user input height falls within bounds
  if (height > 0 && height < 9) {
    break;
  }
}

for (let row = 1; row <= height; row++) {
  // Initialise string for the row
  let rowString = "";

  // Calculating number of spaces from left to the first brick
  const spaces = height - row;

  // Adding spaces between far left and the first brick
  for (let spaceCount = 0; spaceCount < spaces; spaceCount++) {
    rowString += " ";
  }

  // Adding left wall bricks
  for (let leftRow = 0; leftRow < row; leftRow++) {
    rowString += "#";
  }

  // Adding two spaces between left and right wall
  rowString += "  ";

  // Adding right wall bricks
  for (let rightRow = 0; rightRow < row; rightRow++) {
    rowString += "#";
  }

  // Printing row + adding line break for next row
  console.log(rowString);
}
