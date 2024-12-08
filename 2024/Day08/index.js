const input = document.getElementById('input');
const submitButton = document.getElementById('submit');
const result = document.getElementById('result');

submitButton.addEventListener('click', getAnswer);

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

function registerAntennas(matrix) {
  const antennas = {};
  for (let l = 0; l < matrix.length; l++) {
    for (let c = 0; c < matrix[l].length; c++) {
      const char = matrix[l][c];
      if (char !== '.') {
        if (antennas[char]) {
          antennas[char].push([c, l]);
        } else {
          antennas[char] = [[c, l]];
        }
      }
    }
  }
  return antennas;
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

  renderAntinodes(set) {
    this.antinodes = document.createElement('div');
    this.antinodes.id = 'antinodes';
    set.forEach((node) => {
      const element = document.createElement('div');
      element.className = 'antinode';
      element.style.position = 'absolute';
      element.innerHTML = '';
      const position = node.split(',');
      element.style.left = `${position[0] * 30}px`;
      element.style.top = `${position[1] * 30}px`;
      element.onclick = () => {
        element.style.backgroundColor = 'red';
      };
      this.antinodes.appendChild(element);
    });
    this.map.appendChild(this.antinodes);
  }
}

function getAnswer() {
  result.textContent = 'Calculating...';

  const visual = new Visualizer();

  const text = input.value;
  const matrix = text.split('\n').map((line) => line.split(''));
  const antennasMap = registerAntennas(matrix);
  const antinodes = new Set();

  Object.values(antennasMap).forEach((antennas) => {
    antennas.forEach((antenna, i) => {
      antennas
        .filter((_, j) => i !== j)
        .forEach((other) => {
          const x = 2 * antenna[0] - other[0];
          const y = 2 * antenna[1] - other[1];
          if (checkOutOfBounds(matrix, { c: x, l: y })) {
            return;
          }
          antinodes.add(`${x},${y}`);
        });
    });
  });

  visual.renderMap(matrix);
  visual.renderAntinodes(antinodes);

  console.log(matrix);
  console.log(antennasMap);
  console.log(antinodes);

  result.textContent = antinodes.size;
  console.log(antinodes.size);
  return antinodes.size;
}
