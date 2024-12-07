const input = document.getElementById('input');
const submitButton = document.getElementById('submit');
const result = document.getElementById('result');

submitButton.addEventListener('click', getAnswer);

const target = 'XMAS';

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

function checkDirection(matrix, line, column, direction, targetCharIndex) {
  const newPosition = {
    l: line + DIRECTIONS[direction][0],
    c: column + DIRECTIONS[direction][1],
  };
  if (
    newPosition.c < 0 ||
    newPosition.l < 0 ||
    newPosition.l >= matrix.length ||
    newPosition.c > matrix[newPosition.l].length
  ) {
    // Out of bounds check
    return false;
  }
  const newChar = matrix[newPosition.l][newPosition.c];
  if (newChar === target.charAt(targetCharIndex)) {
    if (targetCharIndex === target.length - 1) {
      console.log('FOUND ONE ending at ', newPosition, 'from', direction);
      return true;
    }
    return checkDirection(
      matrix,
      newPosition.l,
      newPosition.c,
      direction,
      targetCharIndex + 1
    );
  }
}

function getAnswer() {
  result.textContent = 'Calculating...';

  const text = input.value;
  const matrix = text.split('\n');
  let count = 0;

  for (let l = 0; l < matrix.length; l++) {
    for (let c = 0; c < matrix[l].length; c++) {
      const char = matrix[l][c];
      if (char === target.charAt(0)) {
        console.log(`found ${char} at [${l}, ${c}]`);
        Object.keys(DIRECTIONS).forEach((direction) => {
          if (checkDirection(matrix, l, c, direction, 1)) {
            count++;
          }
        });
      }
    }
  }

  console.log(matrix);

  result.textContent = count;
  console.log(count);
  return count;
}
