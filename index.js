const REPLACE = {
  one: "o1e",
  two: "t2o",
  three: "t3e",
  four: "f4r",
  five: "f5e",
  six: "s6x",
  seven: "s7n",
  eight: "e8t",
  nine: "n9e",
};

function processInput(text) {
  const lines = text.split("\n");
  values = lines.map((line) => {
    for (let [key, value] of Object.entries(REPLACE)) {
      line = line.replaceAll(key, value);
    }
    const matches = line.match(/\d/gm);
    let firstNumber = matches[0];
    let lastNumber = matches[matches.length - 1];

    console.log(
      line,
      matches,
      firstNumber,
      lastNumber,
      parseInt("" + (firstNumber || 0) + (lastNumber || ""))
    );

    return parseInt("" + (firstNumber || 0) + (lastNumber || ""));
  });

  return values.reduce((acc, curr) => acc + curr, 0);
}

function main() {
  fetch("input.md")
    .then((data) => data.text())
    .then(
      (text) =>
        (document.getElementById("result").innerHTML = processInput(text))
    );
}

main();
