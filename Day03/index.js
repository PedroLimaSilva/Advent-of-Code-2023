function isNextToStar(char) {
  return char && isNaN(char) && char === '*';
}

function processInput(text) {
  const lines = text.split('\n');
  let serialsAcc = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    console.log(line);

    let possibleSerial = '';
    let isPossibleCog = false;
    for (let k = 0; k < line.length; k++) {
      const char = line.charAt(k);
      if (!isNaN(char)) {
        // found a number, look for symbol around it
        possibleSerial += '' + char;

        if (!isPossibleCog) {
          // check horizontal
          isPossibleCog =
            isNextToStar(line.charAt(k - 1)) ||
            isNextToStar(line.charAt(k + 1)) ||
            // check line above
            (i > 0 &&
              (isNextToStar(lines[i - 1].charAt(k - 1)) ||
                isNextToStar(lines[i - 1].charAt(k)) ||
                isNextToStar(lines[i - 1].charAt(k + 1)))) ||
            (i < lines.length - 1 &&
              (isNextToStar(lines[i + 1].charAt(k - 1)) ||
                isNextToStar(lines[i + 1].charAt(k)) ||
                isNextToStar(lines[i + 1].charAt(k + 1))));
        }
      } else {
        // current char is not a number, store the serial if valid and reset the building serial
        if (isPossibleCog) {
          isPossibleCog = false;
          serialsAcc += parseInt(possibleSerial);
          console.log(possibleSerial);
        }
        possibleSerial = '';
      }
    }
    if (isPossibleCog) {
      isPossibleCog = false;
      serialsAcc += parseInt(possibleSerial);
      console.log(possibleSerial);
    }
    possibleSerial = '';
  }

  return serialsAcc;
}

function main() {
  fetch('input.md')
    .then((data) => data.text())
    .then((text) => {
      document.getElementById('input').textContent = text;
      document.getElementById('result').innerHTML = processInput(text);
    });
}

main();
