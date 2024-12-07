const input = document.getElementById('input');
const submitButton = document.getElementById('submit');
const result = document.getElementById('result');

submitButton.addEventListener('click', getAnswer);

const DIRECTIONS = {
  '^': [-1, 0], // N
  v: [1, 0], // S
  '>': [0, 1], // E
  '<': [0, -1], // W
};

const OBSTACLE = '#';

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

function turnRight(direction) {
  switch (direction) {
    case '^':
      return '>';
    case '>':
      return 'v';
    case 'v':
      return '<';
    case '<':
      return '^';
    default:
      throw Error('wft direction is this', direction);
  }
}

function moveGuardInDirection(matrix, direction, line, column) {
  const vector = DIRECTIONS[direction];
  const newPosition = { l: line + vector[0], c: column + vector[1] };
  console.log('moving to', newPosition);
  if (checkOutOfBounds(matrix, newPosition)) {
    console.log('got out of bounds');
    return { outOfBounds: true };
  }
  if (matrix[newPosition.l][newPosition.c] === OBSTACLE) {
    console.log('turning right');
    newPosition.l = line;
    newPosition.c = column;
    direction = turnRight(direction);
  }
  console.log(matrix[newPosition.l][newPosition.c]);
  let increment = 0;
  if (matrix[newPosition.l][newPosition.c] !== 'X') {
    increment = 1;
    matrix[newPosition.l] =
      matrix[newPosition.l].substring(0, newPosition.c) +
      'X' +
      matrix[newPosition.l].substring(newPosition.c + 1);
  }
  renderGuardAt(newPosition, direction);
  return { direction, newPosition, increment };
}

function isGuard(char) {
  return char === '^' || char === 'v' || char === '>' || char === '<';
}

function renderMap(matrix) {
  const mapDiv = document.getElementById('map');
  mapDiv.innerHTML = '';

  let guardPosition = {};
  for (let l = 0; l < matrix.length; l++) {
    const row = document.createElement('div');
    for (let c = 0; c < matrix[l].length; c++) {
      const cell = matrix[l][c];
      const guard = isGuard(cell);
      if (guard) {
        guardPosition.c = c;
        guardPosition.l = l;
      }
      const element = document.createElement('div');
      element.className = 'cell';
      element.innerHTML = guard ? '.' : cell;
      row.appendChild(element);
    }
    mapDiv.appendChild(row);
  }
  renderGuardAt(guardPosition, '^');
}

function renderGuardAt(position, direction) {
  const mapDiv = document.getElementById('map');
  let guardElement = document.getElementById('guard');
  if (!guardElement) {
    guardElement = document.createElement('div');
    guardElement.id = 'guard';
    mapDiv.appendChild(guardElement);
  }
  guardElement.innerHTML = direction;
  guardElement.style.left = `${position.c * 30}px`;
  guardElement.style.top = `${position.l * 30}px`;
}

function getAnswer() {
  result.textContent = 'Calculating...';

  const text = input.value;
  const matrix = text.split('\n');
  console.log(matrix);

  renderMap(matrix);

  const position = {};
  for (let l = 0; l < matrix.length; l++) {
    for (let c = 0; c < matrix[l].length; c++) {
      const char = matrix[l][c];
      if (isGuard(char)) {
        console.log(`found guard at [${l}, ${c}]`);
        position.l = l;
        position.c = c;
        position.d = char;
        break;
      }
    }
    if (position.l != undefined) {
      break;
    }
  }

  let count = 0;
  let done = false;
  while (!done) {
    const { increment, outOfBounds, newPosition, direction } =
      moveGuardInDirection(matrix, position.d, position.l, position.c);
    if (outOfBounds) {
      break;
    }
    done = outOfBounds;
    position.l = newPosition.l;
    position.c = newPosition.c;
    position.d = direction;
    count += increment;
  }

  result.textContent = count;
  return text;
}
