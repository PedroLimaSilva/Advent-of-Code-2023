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

function emoji(char) {
  switch (char) {
    case '^':
      return '⬆️';
    case '>':
      return '➡️';
    case 'v':
      return '⬇️';
    case '<':
      return '⬅️';
    default:
      return char;
  }
}

function checkOutOfBounds(matrix, position) {
  if (
    position.c < 0 ||
    position.l < 0 ||
    position.l >= matrix.length ||
    position.c >= matrix[position.l].length
  ) {
    // Out of bounds check
    return true;
  }
}

function isGuard(char) {
  return char === '^' || char === 'v' || char === '>' || char === '<';
}

function findPosition(matrix, condition) {
  for (let l = 0; l < matrix.length; l++) {
    for (let c = 0; c < matrix[l].length; c++) {
      const char = matrix[l][c];
      if (condition(char)) {
        console.log(`found guard at [${l}, ${c}]`);
        return { l, c, d: char };
      }
    }
  }
}

class Guard {
  constructor(startingPosition) {
    this.startingPosition = startingPosition;
    this.l = startingPosition.l;
    this.c = startingPosition.c;
    this.d = startingPosition.d;

    // store a record of all positions visited including direction
    this.log = new Map();
    this.steps = 0;
  }

  reset() {
    this.steps = 0;
    this.l = this.startingPosition.l;
    this.c = this.startingPosition.c;
    this.d = this.startingPosition.d;
    this.log = new Map();
  }

  isLooping() {
    // if we're vising the same place facing the same direction, we're in a loop
    return this.steps > this.log.size;
  }

  move(matrix) {
    let newPosition = this.getNextPosition();
    if (checkOutOfBounds(matrix, newPosition)) {
      console.log('got out of bounds');
      return { outOfBounds: true };
    }
    if (matrix[newPosition.l][newPosition.c] === OBSTACLE) {
      this.turnRight();
      newPosition = this.getNextPosition();
      if (matrix[newPosition.l][newPosition.c] === OBSTACLE) {
        //might need to do a 180
        this.turnRight();
        newPosition = this.getNextPosition();
      }
    }

    this.l = newPosition.l;
    this.c = newPosition.c;
    this.log.set(JSON.stringify({ l: this.l, c: this.c, d: this.d }));

    visual.renderGuardAt(newPosition, this.d);
    this.steps++;

    if (matrix[this.l][this.c] !== 'X') {
      // matrix[this.l][this.c] = 'X';
      visual.drawPathAt(newPosition);
    }
    if (visual.enabled) {
      debugger;
    }
    return { outOfBounds: false };
  }

  getNextPosition() {
    const vector = DIRECTIONS[this.d];
    return { l: this.l + vector[0], c: this.c + vector[1] };
  }

  turnRight() {
    switch (this.d) {
      case '^':
        this.d = '>';
        break;
      case '>':
        this.d = 'v';
        break;
      case 'v':
        this.d = '<';
        break;
      case '<':
        this.d = '^';
        break;
      default:
        throw Error('wft direction is this', direction);
    }
  }
}

class Visualizer {
  constructor() {
    this.enabled = true;
    this.map = document.getElementById('map');
    this.map.innerHTML = '';
  }

  renderMap(matrix) {
    if (this.enabled) {
      this.map.innerHTML = '';
      this.guard = document.createElement('div');
      this.guard.id = 'guard';
      this.map.appendChild(this.guard);

      for (let l = 0; l < matrix.length; l++) {
        const row = document.createElement('div');
        for (let c = 0; c < matrix[l].length; c++) {
          const cell = matrix[l][c];
          const element = document.createElement('div');
          element.className = 'cell';
          element.innerHTML = cell;
          row.appendChild(element);
        }
        this.map.appendChild(row);
      }
    }
  }

  renderGuardAt(position, direction) {
    if (this.enabled) {
      this.guard.innerHTML = emoji(direction);
      this.guard.style.left = `${position.c * 30}px`;
      this.guard.style.top = `${position.l * 30}px`;
    }
  }

  drawPathAt(position) {
    if (this.enabled) {
      const path = document.createElement('div');
      path.className = 'path';
      path.innerHTML = 'x';
      path.style.left = `${position.c * 30}px`;
      path.style.top = `${position.l * 30}px`;
      this.map.appendChild(path);
    }
  }

  drawIntersection(position) {
    if (this.enabled) {
      const path = document.createElement('div');
      path.className = 'path intersection';
      path.innerHTML = '🔴';
      path.style.left = `${position.c * 30}px`;
      path.style.top = `${position.l * 30}px`;
      this.map.appendChild(path);
    }
  }
}

const visual = new Visualizer();

function part1() {
  result.textContent = 'Calculating...';

  const text = input.value;
  const matrix = text.split('\n').map((row) => row.split(''));
  console.log(matrix);

  visual.renderMap(matrix);

  const position = findPosition(matrix, isGuard);
  visual.renderGuardAt(position);
  matrix[position.l][position.c] = 'X';
  visual.drawPathAt(position);

  const guard = new Guard(position);

  while (true) {
    visual.drawPathAt(position);
    const { outOfBounds } = guard.move(matrix);
    if (outOfBounds) {
      break;
    }
  }

  let countX = 0;
  for (let l = 0; l < matrix.length; l++) {
    for (let c = 0; c < matrix[l].length; c++) {
      const char = matrix[l][c];
      if (char === 'X') {
        countX++;
      }
    }
  }

  result.textContent = countX;
  return text;
}

function getAnswer() {
  result.textContent = 'Calculating...';

  const text = input.value;
  const matrix = text.split('\n').map((row) => row.split(''));

  visual.renderMap(matrix);
  if (matrix.length > 20) {
    visual.enabled = false;
  }

  const position = findPosition(matrix, isGuard);
  visual.renderGuardAt(position);
  matrix[position.l][position.c] = 'X';
  visual.drawPathAt(position);

  const guard = new Guard(position);

  let obstacles = 0;
  for (let l = 0; l < matrix.length; l++) {
    for (let c = 0; c < matrix[l].length; c++) {
      guard.reset();

      const cell = matrix[l][c];
      if (cell === '.') {
        matrix[l][c] = '#';
        visual.renderMap(matrix);
        while (true) {
          const { outOfBounds } = guard.move(matrix);
          if (outOfBounds) {
            matrix[l][c] = '.';
            break;
          }

          if (guard.isLooping()) {
            matrix[l][c] = '.';
            obstacles++;
            break;
          }
        }
      }
    }
  }

  result.textContent = obstacles;
  console.log(obstacles);
  return text;
}
