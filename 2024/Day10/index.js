const input = document.getElementById("input");
const submitButton = document.getElementById("submit");
const result = document.getElementById("result");

submitButton.addEventListener("click", getAnswer);

const DIRECTIONS = {
  N: [-1, 0],
  S: [1, 0],
  E: [0, 1],
  W: [0, -1],
};

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

function findFrom(log, matrix, targetValue, { l, c }, originalStart) {
  if (checkOutOfBounds(matrix, { l, c })) {
    return;
  }
  if (targetValue === matrix[l][c]) {
    const currentPaths = log.get(`${originalStart.l},${originalStart.c}`) || 0;
    console.log({ currentPaths });
    log.set(`${originalStart.l},${originalStart.c}`, currentPaths + 1);
    // console.log("found target at", { l, c });
    return;
  }
  const directions = Object.values(DIRECTIONS);
  const currentValue = matrix[l][c];
  for (let i = 0; i < directions.length; i++) {
    const dir = directions[i];
    const newPosition = { l: l + dir[0], c: c + dir[1] };
    const newValue = matrix[newPosition.l]?.[newPosition.c];
    // console.log({ newValue, currentValue, diff: newValue - currentValue });
    if (newValue - currentValue === 1) {
      // console.log("pathing", newPosition);
      findFrom(log, matrix, targetValue, newPosition, originalStart);
    }
  }
}

function findStarts(matrix) {
  const starts = [];
  for (let l = 0; l < matrix.length; l++) {
    const line = matrix[l];
    for (let c = 0; c < line.length; c++) {
      const cell = line[c];
      if (cell === 0) {
        starts.push({ l, c });
      }
    }
  }
  return starts;
}

function getAnswer() {
  result.textContent = "Calculating...";

  const text = input.value;
  const matrix = text
    .split("\n")
    .map((line) => line.split("").map((char) => +char));

  const starts = findStarts(matrix);
  console.log(matrix, starts);
  const logs = [];

  for (let s = 0; s < starts.length; s++) {
    const start = starts[s];
    console.log("starting from ", start);
    const log = new Map();
    findFrom(log, matrix, 9, start, start);
    logs.push(log);
    console.log(log);
  }

  const answer = logs.reduce(
    (acc, map) =>
      acc + map.values().reduce((rating, paths) => rating + paths, 0),
    0
  );

  console.log(answer);
  result.textContent = answer;
  return answer;
}
