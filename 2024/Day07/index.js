const input = document.getElementById('input');
const submitButton = document.getElementById('submit');
const result = document.getElementById('result');

submitButton.addEventListener('click', getAnswer);

const OPERATORS = {
  '*': (a, b) => a * b,
  '+': (a, b) => a + b,
};

function generateOperatorCombos(nArgs) {
  const nOperations = nArgs - 1;
  const operators = Object.keys(OPERATORS);

  if (nOperations === 0) return []; // Base case: no operations for one argument
  if (nOperations === 1) return operators.map((op) => [op]); // Single operation combinations as arrays

  const combos = [];
  const smallerCombos = generateOperatorCombos(nOperations);

  for (const smallComb of smallerCombos) {
    for (const operator of operators) {
      combos.push([...smallComb, operator]); // Append operator to the combination
    }
  }

  return combos;
}

function applyCombo(args, operators) {
  console.log(args, operators);
  return operators.reduce((acc, operator, i) => {
    return OPERATORS[operator](acc, +args[i + 1]);
  }, +args[0]);
}

function isPossible(res, args) {
  const combos = generateOperatorCombos(args.length);
  for (let i = 0; i < combos.length; i++) {
    const combo = combos[i];
    const comboResult = applyCombo(args, combo);
    console.log(comboResult);
    if (comboResult === +res) {
      return combo;
    }
  }
}

function getAnswer() {
  result.textContent = 'Calculating...';

  const text = input.value;
  const equations = text.split('\n').map((eq) => eq.split(': '));
  let answer = 0;

  equations.forEach(([res, args]) => {
    args = args.split(' ');
    console.log({ res, args });
    if (isPossible(res, args)) {
      answer += +res;
    }
  });

  result.textContent = answer;
  console.log(answer);
  return answer;
}
