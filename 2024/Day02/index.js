const input = document.getElementById("input");
const submitButton = document.getElementById("submit");
const result = document.getElementById("result");

submitButton.addEventListener("click", rateReports);

function isReportSafe(report) {
  let prevEntry;
  let isAscending;
  console.groupEnd();

  console.group(report);
  for (let i = 0; i < report.length; i++) {
    const entry = +report[i];
    if (prevEntry === undefined) {
      prevEntry = entry;
      continue;
    }
    if (prevEntry === entry) {
      console.log("repeated entries", { prevEntry, entry });
      return { safe: false, index: i };
    }
    if (prevEntry !== entry) {
      if (isAscending === undefined) {
        isAscending = prevEntry < entry;
        // console.log("isAscending", isAscending, { prevEntry, entry });
      } else {
        if (isAscending && prevEntry > entry) {
          console.log("stopped ascending", { prevEntry, entry });
          return { safe: false, index: i };
        } else if (!isAscending && prevEntry < entry) {
          console.log("stopped descending", { prevEntry, entry });
          return { safe: false, index: i };
        }
      }
      const distance = Math.abs(prevEntry - entry);
      if (distance > 3) {
        console.log("distance bigger than 3", distance, { prevEntry, entry });
        return { safe: false, index: i };
      }
    }
    prevEntry = entry;
  }
  console.info("is Safe");
  return { safe: true };
}

function getDampenedOptions(report) {
  let options = [];
  for (let i = 0; i < report.length; i++) {
    let dampenedEntryOption = [...report];
    dampenedEntryOption.splice(i, 1);
    options.push(dampenedEntryOption);
  }
  return options;
}

function rateReports() {
  result.textContent = "Calculating...";

  const text = input.value;
  const lines = text.split("\n");
  let sum = 0;
  for (let l = 0; l < lines.length; l++) {
    const entries = lines[l].split(" ");
    const result = isReportSafe(entries);
    if (result.safe) {
      sum++;
      continue;
    } else if (result.index) {
      const options = getDampenedOptions(entries);
      for (let i = 0; i < options.length; i++) {
        const option = options[i];
        if (isReportSafe(option).safe) {
          sum++;
          console.log("found option that works", option);
          break;
        }
      }
    }
  }
  result.textContent = sum;
  console.log(sum);
  return sum;
}
