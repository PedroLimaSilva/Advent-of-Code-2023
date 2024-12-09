const input = document.getElementById("input");
const submitButton = document.getElementById("submit");
const result = document.getElementById("result");

submitButton.addEventListener("click", getAnswer);

function buildStorage(diskMap) {
  const storage = [];
  let id = 0;
  for (let i = 0; i < diskMap.length; i++) {
    const blockSize = diskMap[i];
    const isOccupied = i === 0 || i % 2 === 0;
    const fileName = isOccupied ? id : ".";
    storage.push({ id: fileName, length: +blockSize });

    if (isOccupied) {
      id++;
    }
  }
  return { storage };
}

function compact(storage) {
  for (let d = storage.length - 1; d > 0; d--) {
    const data = storage[d];
    if (data.id === ".") {
      continue;
    }
    for (let f = 0; f < storage.length; f++) {
      const freeSpace = storage[f];
      if (f > d) {
        // looking at freespace after the position of the current file
        break;
      }
      if (freeSpace.id === ".") {
        if (freeSpace.length === data.length) {
          console.log(
            "found free space with exact size",
            JSON.stringify({ data, freeSpace })
          );
          storage[f].id = storage[d].id;
          storage[d].id = ".";

          printStorage(storage);
          break;
        }
        if (freeSpace.length > data.length) {
          console.log(
            "found free space with bigger size",
            JSON.stringify({ data, freeSpace })
          );
          const spaceDiff = freeSpace.length - data.length;
          storage[f].id = storage[d].id;
          storage[f].length = storage[d].length;
          storage[d].id = ".";
          storage.splice(f + 1, 0, { id: ".", length: spaceDiff });

          printStorage(storage);
          break;
        }
      }
    }
  }
}

function checksum(storage) {
  let sum = 0;
  let index = 0;

  for (let i = 0; i < storage.length; i++) {
    const id = storage[i].id;
    if (id !== ".") {
      for (let f = 0; f < storage[i].length; f++) {
        sum += id * index;
        index++;
      }
    } else {
      index += storage[i].length;
    }
  }
  return sum;
}

function printStorage(storage) {
  let str = "";
  for (let i = 0; i < storage.length; i++) {
    const element = storage[i];
    for (let f = 0; f < element.length; f++) {
      str += element.id;
    }
  }
  console.log(str);
}

function getAnswer() {
  result.textContent = "Calculating...";

  const text = input.value;
  const diskMap = text.split("");
  let answer = 0;

  console.log(diskMap);

  const { storage } = buildStorage(diskMap);

  printStorage(storage);
  compact(storage);
  printStorage(storage);

  answer = checksum(storage);

  result.textContent = answer;
  console.log(answer);
  return answer;
}
