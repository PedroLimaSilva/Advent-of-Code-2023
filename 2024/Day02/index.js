const input = document.getElementById('input');
const submitButton = document.getElementById('submit');
const result = document.getElementById('result');

submitButton.addEventListener('click', rateReports);

function isReportSafe(report) {
  let prevEntry;
  let isAscending;
  console.groupEnd();

  console.group(report);
  let hasSkipped = false;
  for (let i = 0; i < report.length; i++) {
    const entry = +report[i];
    if (prevEntry === undefined) {
      prevEntry = entry;
      continue;
    }
    if (prevEntry === entry) {
      console.log('repeated entries', { prevEntry, entry });
      if (hasSkipped) {
        return false;
      } else {
        console.log('dampening', { i, entry });
        hasSkipped = true;
        prevEntry = entry;
        continue;
      }
    }
    if (prevEntry !== entry) {
      if (isAscending === undefined) {
        isAscending = prevEntry < entry;
        console.log('isAscending', isAscending, { prevEntry, entry });
      } else {
        if (isAscending && prevEntry > entry) {
          console.log('stopped ascending', { prevEntry, entry });
          if (hasSkipped) {
            return false;
          } else {
            console.log('dampening', { i, entry });
            hasSkipped = true;
            prevEntry = entry;
            continue;
          }
        } else if (!isAscending && prevEntry < entry) {
          console.log('stopped descending', { prevEntry, entry });
          if (hasSkipped) {
            return false;
          } else {
            console.log('dampening', { i, entry });
            hasSkipped = true;
            prevEntry = entry;
            continue;
          }
        }
      }
      const distance = Math.abs(prevEntry - entry);
      if (distance > 3) {
        console.log('distance bigger than 3', distance, { prevEntry, entry });
        if (hasSkipped) {
          return false;
        } else {
          console.log('dampening', { i, entry });
          hasSkipped = true;
          prevEntry = entry;
          continue;
        }
      }
    }
    prevEntry = entry;
  }
  console.info('is Safe')
  return true;
}

function rateReports() {
  result.textContent = 'Calculating...';

  const text = input.value;
  const lines = text.split('\n');
  let sum = 0;
  for (let l = 0; l < lines.length; l++) {
    const entries = lines[l].split(' ');
    if (isReportSafe(entries)) {
      sum++;
    }
    result.textContent = sum;
  }
  console.log(sum);
  return sum;
}
