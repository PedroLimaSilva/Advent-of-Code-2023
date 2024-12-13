const input = document.getElementById("input");
const submitButton = document.getElementById("submit");
const result = document.getElementById("result");

submitButton.addEventListener("click", getAnswer);

const DIRECTIONS = {
  N: [-1, 0],
  E: [0, 1],
  S: [1, 0],
  W: [0, -1],
};

class Region {
  constructor(matrix, id) {
    this.id = id;
    this.matrix = matrix;
    this.cells = [];
  }

  get area() {
    return this.cells.length;
  }

  get perimeter() {
    let borderCount = 0;
    this.cells.forEach(({ l, c }) => {
      Object.values(DIRECTIONS).forEach((dir) => {
        const neighbour = this.matrix[l + dir[0]]?.[c + dir[1]];
        if (neighbour !== this.id) {
          borderCount++;
        }
      });
    });
    return borderCount;
  }

  get sides() {
    let sideCount = 0;
    console.log(this.id, this.cells);
    for (let l = 0; l < this.matrix.length; l++) {
      for (let c = 0; c < this.matrix[l].length; c++) {
        const cell = this.matrix[l][c];
      }
    }
    return sideCount;
  }

  setCells(cells) {
    this.cells = cells;
  }
}

class Visualizer {
  constructor() {
    this.map = document.getElementById("map");
    this.map.innerHTML = "";
    this.regions = new Map();
  }

  reset() {
    this.map.innerHTML = "";
    this.regions = new Map();
  }

  renderMap(matrix) {
    for (let l = 0; l < matrix.length; l++) {
      for (let c = 0; c < matrix[l].length; c++) {
        const cell = matrix[l][c];
        let color = this.regions.get(cell);
        if (!color) {
          color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)})`;
          this.regions.set(cell, color);
        }

        const element = document.createElement("div");
        element.className = "cell";
        const text = document.createElement("span");
        text.innerHTML = cell;
        element.appendChild(text);

        element.style.left = `${c * 30}px`;
        element.style.top = `${l * 30}px`;
        element.style.backgroundColor = color;
        this.map.appendChild(element);
      }
    }
  }
}

function checkNeighbours(matrix, visited, { l, c }, id) {
  const cells = [{ l, c }];
  visited[`${l},${c}`] = true;
  Object.values(DIRECTIONS).forEach((dir) => {
    let nPosition = { l: l + dir[0], c: c + dir[1] };
    let neighbour = matrix[nPosition.l]?.[nPosition.c];
    if (!visited[`${nPosition.l},${nPosition.c}`] && neighbour === id) {
      cells.push(...checkNeighbours(matrix, visited, nPosition, id));
    }
  });
  return cells;
}

function createRegions(matrix) {
  const regions = [];
  const visited = {};
  for (let l = 0; l < matrix.length; l++) {
    for (let c = 0; c < matrix[l].length; c++) {
      // console.groupEnd();
      // console.group("looking for region at", { l, c });
      if (visited[`${l},${c}`]) {
        // console.log("already visited, moving on");
        continue;
      }
      // console.log(visited);

      const id = matrix[l][c];
      // console.log("found id", id);
      const region = new Region(matrix, id);

      region.setCells(checkNeighbours(matrix, visited, { l, c }, id));

      regions.push(region);
    }
  }
  return regions;
}

function getAnswer() {
  result.textContent = "Calculating...";

  const text = input.value;
  const matrix = text.split("\n").map((line) => line.split(""));

  console.log(matrix);
  const visual = new Visualizer();

  visual.renderMap(matrix);

  const regions = createRegions(matrix);
  // console.groupEnd();
  const answer = regions.reduce(
    (acc, region) => acc + region.area * region.sides,
    0
  );
  console.log(answer);
  result.textContent = answer;
  return matrix;
}
