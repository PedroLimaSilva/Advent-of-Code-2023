function getGamePower(gameSets) {
  const maxValues = { r: 0, g: 0, b: 0 };
  for (set of gameSets) {
    for (ball of set) {
      const color = ball.charAt(ball.length - 1);
      const amount = parseInt(ball.substring(0, ball.length - 1));
      maxValues[color] = Math.max(maxValues[color], amount);
    }
  }
  return maxValues.r * maxValues.b * maxValues.g;
}

function processInput(text) {
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

    const gamePower = getGamePower(sets.map((set) => set.split(", ")));
    console.log(gameNumber, gamePower);

    return gamePower;
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
      document.getElementById("result").innerHTML = processInput(text);
    });
}

main();
