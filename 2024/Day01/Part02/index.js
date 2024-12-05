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

  // Register the number of times a number appears on right list
  const countMap = {};
  for (let line = 0; line < lines.length; line++) {
    const [l, r] = lines[line].split('   ');

    if (countMap[r] !== undefined) {
      countMap[r] = countMap[r] + 1;
    } else {
      countMap[r] = 1;
    }

    left.push(l);
    right.push(r);
  }

  let sum = 0;
  for (let l = 0; l < lines.length; l++) {
    sum += left[l] * (countMap[left[l]] || 0);
    result.textContent = sum;
  }
  return sum;
}
