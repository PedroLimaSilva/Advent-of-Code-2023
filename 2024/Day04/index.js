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
  if (checkOutOfBounds(matrix, newPosition)) {
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

function part1() {
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

function checkOutOfBounds(matrix, position) {
  if (
    position.c < 0 ||
    position.l < 0 ||
    position.l >= matrix.length ||
    position.c > matrix[position.l].length
  ) {
    // Out of bounds check
    return true;
  }
}

const X_MAS_CHAR = {
  M: true,
  S: true,
};

function getAnswer() {
  result.textContent = 'Calculating...';

  const text = input.value;
  const matrix = text.split('\n');
  let count = 0;

  for (let l = 0; l < matrix.length; l++) {
    for (let c = 0; c < matrix[l].length; c++) {
      const char = matrix[l][c];
      if (char === 'A') {
        console.log(`found ${char} at [${l}, ${c}]`);

        const nw = { l: l + DIRECTIONS.NW[0], c: c + DIRECTIONS.NW[1] };
        const ne = { l: l + DIRECTIONS.NE[0], c: c + DIRECTIONS.NE[1] };
        const sw = { l: l + DIRECTIONS.SW[0], c: c + DIRECTIONS.SW[1] };
        const se = { l: l + DIRECTIONS.SE[0], c: c + DIRECTIONS.SE[1] };
        if (
          checkOutOfBounds(matrix, nw) ||
          checkOutOfBounds(matrix, ne) ||
          checkOutOfBounds(matrix, sw) ||
          checkOutOfBounds(matrix, se)
        ) {
          continue;
        }
        let masCount = 0;
        if (matrix[nw.l][nw.c] === 'M') {
          if (matrix[se.l][se.c] === 'S') {
            masCount++;
          }
        }
        if (matrix[nw.l][nw.c] === 'S') {
          if (matrix[se.l][se.c] === 'M') {
            masCount++;
          }
        }
        if (masCount === 0) {
          continue;
        }
        if (matrix[ne.l][ne.c] === 'M') {
          if (matrix[sw.l][sw.c] === 'S') {
            count++;
            continue;
          }
        }
        if (matrix[ne.l][ne.c] === 'S') {
          if (matrix[sw.l][sw.c] === 'M') {
            count++;
            continue;
          }
        }
      }
    }
  }

  console.log(matrix);

  result.textContent = count;
  console.log(count);
  return count;
}
