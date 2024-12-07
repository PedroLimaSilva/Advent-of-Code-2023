const input = document.getElementById('input');
const submitButton = document.getElementById('submit');
const result = document.getElementById('result');

submitButton.addEventListener('click', getAnswer);

const ruleMap = {};

function addRule(rule) {
  if (ruleMap[rule[0]] === undefined) {
    ruleMap[rule[0]] = [+rule[1]];
  } else {
    ruleMap[rule[0]].push(+rule[1]);
  }
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
    console.log(update);
    if (update.length > 1) {
      let breaksRule = false;
      console.log('update', update);
      for (let u = 0; u < update.length; u++) {
        const step = +update[u];
        const stepConstraints = ruleMap[step];
        console.log('stepConstraints', step, stepConstraints);
        for (let c = 0; c < stepConstraints?.length; c++) {
          const constraint = stepConstraints[c];
          console.log('constraint', constraint, c, u);
          for (let b = u - 1; b >= 0; b--) {
            console.log('backtraking', constraint, +update[b]);
            if (constraint === +update[b]) {
              console.log('found a rule break', step, update, stepConstraints);
              breaksRule = true;
              break;
            }
          }
          if (breaksRule) {
            break;
          }
        }
        if (breaksRule) {
          break;
        }
      }
      if (!breaksRule) {
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
