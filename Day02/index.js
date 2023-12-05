function checkGame(gameSets, constraints) {
  console.log(gameSets);
  const maxValues = { r: 0, g: 0, b: 0 };
  for (set of gameSets) {
    console.log("set");
    for (ball of set) {
      const color = ball.charAt(ball.length - 1);
      const amount = parseInt(ball.substring(0, ball.length - 1));
      maxValues[color] = Math.max(maxValues[color], amount);
      console.log(color, amount, ball, maxValues[color]);
    }
  }
  return (
    maxValues.r <= constraints.r &&
    maxValues.g <= constraints.g &&
    maxValues.b <= constraints.b
  );
}

function processInput(text, constraints) {
  const goodGamesAcc = 0;

  text = text
    .replaceAll(" green", "g")
    .replaceAll(" red", "r")
    .replaceAll(" blue", "b");
  const games = text.split("\n");
  values = games.map((game) => {
    const sets = game.split(/[;:] /);

    const gameNumber = parseInt(sets[0].replace("Game ", ""));
    sets.shift();

    const gameCheck = checkGame(
      sets.map((set) => set.split(", ")),
      constraints
    );
    console.log(gameNumber, gameCheck);

    return gameCheck ? gameNumber : 0;
  });

  return values.reduce((acc, curr) => acc + curr, 0);
}

const CONSTRAINTS = { r: 12, g: 13, b: 14 };

function main() {
  fetch("input.md")
    .then((data) => data.text())
    .then((text) => {
      console.log(text);
      document.getElementById("input").textContent = text;
      document.getElementById("result").innerHTML = processInput(
        text,
        CONSTRAINTS
      );
    });
}

main();
