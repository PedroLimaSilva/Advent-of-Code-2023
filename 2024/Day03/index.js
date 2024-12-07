const input = document.getElementById("input");
const submitButton = document.getElementById("submit");
const result = document.getElementById("result");

submitButton.addEventListener("click", getAnswer);

const uncorruptedRegex = /mul\(\d+,\d+\)/g;

function part1() {
  result.textContent = "Calculating...";

  const text = input.value;
  const matches = text.match(uncorruptedRegex);
  let sum = 0;
  for (let l = 0; l < matches.length; l++) {
    const match = matches[l];
    const [a, b] = match.match(/\d+/g);
    sum += a * b;
  }
  result.textContent = sum;
  console.log(sum);
  return sum;
}

const doDontRegex = /(mul\(\d+,\d+\))|(do\(\))|(don't\(\))/g;

function getAnswer() {
  result.textContent = "Calculating...";

  const text = input.value;
  const matches = text.match(doDontRegex);
  let sum = 0;
  let isEnabled = true;
  for (let l = 0; l < matches.length; l++) {
    const match = matches[l];
    if (match === "do()") {
      isEnabled = true;
      continue;
    }
    if (match === "don't()") {
      isEnabled = false;
      continue;
    }
    const [a, b] = match.match(/\d+/g);
    if (isEnabled) {
      sum += a * b;
    }
  }
  result.textContent = sum;
  console.log(sum);
  return sum;
}
