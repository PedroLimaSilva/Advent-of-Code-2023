const input = document.getElementById('input');
const submitButton = document.getElementById('submit');
const result = document.getElementById('result');

submitButton.addEventListener('click', getAnswer);

const ruleMap = {};

function addRule(rule) {
  if (ruleMap[rule[0]] === undefined) {
    ruleMap[rule[0]] = [];
  }
  ruleMap[rule[0]][rule[1]] = true;
}

function getAnswer() {
  result.textContent = 'Calculating...';

  const text = input.value;
  const lines = text.split('\n');

  let sum = 0;

  console.log(lines);
  for (let i = 0; i < lines.length; i++) {
    const rule = lines[i].split('|');
    if (rule.length === 2) {
      addRule(rule);
      continue;
    }
    const update = lines[i].split(',');
    if (update.length > 1) {
      console.groupEnd()
      console.group(update);
      let breaksRule = false;
      for (let u = 0; u < update.length; u++) {
        const step = +update[u];
        const prev = +update[u - 1];
        console.log(step, prev);
        if (ruleMap[step] && prev && ruleMap[step][prev]) {
          console.log('found a rule break', step, prev, ruleMap[step]);
          update[u] = prev + 0;
          update[u - 1] = step + 0;
          u = 0;
          breaksRule = true;
          // break;
        }
      }
      if (breaksRule) {
        const middle = +update[Math.floor(update.length / 2)];
        console.log('adding', update, middle);
        sum += middle;
      }
    }
  }
  console.log(ruleMap);
  console.log(sum);

  result.textContent = sum;
  return text;
}
