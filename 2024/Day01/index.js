const input = document.getElementById('input');
const submitButton = document.getElementById('submit');
const result = document.getElementById('result');

submitButton.addEventListener('click', getSimilarity);

const sortAsc = (a, b) => a - b;

function getSimilarity() {
  result.textContent = 'Calculating...';

  const text = input.value;
  const left = [];
  const right = [];
  const lines = text.split('\n');
  for (let l = 0; l < lines.length; l++) {
    const ids = lines[l].split('   ');

    left.push(ids[0]);
    right.push(ids[1]);
  }
  left.sort(sortAsc);
  right.sort(sortAsc);

  let sum = 0;
  for (let l = 0; l < lines.length; l++) {
    sum += Math.abs(left[l] - right[l]);
    result.textContent = sum;
  }
  console.log(left, right);
  return sum;
}
