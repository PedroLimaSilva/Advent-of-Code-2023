const input = document.getElementById("input");
const submitButton = document.getElementById("submit");
const result = document.getElementById("result");

submitButton.addEventListener("click", getAnswer);

const target = "XMAS";

function testCharacter(character, targetCharIndex) {
  let targetChar = target.charAt(targetCharIndex);
  let countIncrease = 0;
  if (character === targetChar) {
    targetCharIndex++;
    if (targetCharIndex === target.length) {
      countIncrease++;
      targetCharIndex = 0;
    }
  } else {
    targetCharIndex = 0;
    targetChar = target.charAt(targetCharIndex);
    if (character === targetChar) {
      targetCharIndex++;
    }
  }
  return { targetCharIndex, countIncrease };
}

const DIRECTIONS = {
  N: [-1, 0],
  S: [1, 0],
  E: [0, 1],
  W: [0, -1],
  NE: [-1, 1],
  NW: [-1, -1],
  SE: [1, 1],
  SW: [1, -1],
};

function getAnswer() {
  result.textContent = "Calculating...";

  const text = input.value;
  const matrix = text.split("\n");
  let count = 0;

  console.log(matrix, matrix[2][4]);

  result.textContent = count;
  console.log(count);
  return count;
}
