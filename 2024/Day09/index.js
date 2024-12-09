const input = document.getElementById("input");
const submitButton = document.getElementById("submit");
const result = document.getElementById("result");

submitButton.addEventListener("click", getAnswer);

function buildStorage(diskMap) {
  const storage = [];
  const freeSpace = [];
  let id = 0;
  for (let i = 0; i < diskMap.length; i++) {
    const blockSize = diskMap[i];
    const isOccupied = i === 0 || i % 2 === 0;
    for (let s = 0; s < blockSize; s++) {
      if (isOccupied) {
        storage.push(id);
      } else {
        storage.push(".");
        freeSpace.push(storage.length - 1);
      }
    }
    if (isOccupied) {
      id++;
    }
  }
  return { storage, freeSpace };
}

function compact(storage, freeSpace) {
  for (let i = storage.length - 1; i >= 0; i--) {
    const block = storage[i];
    if (block !== ".") {
      const freeSpaceIndex = freeSpace.shift();
      if (freeSpaceIndex !== undefined && freeSpaceIndex < i) {
        storage[freeSpaceIndex] = block;
        storage[i] = ".";
      }
    }
  }
}

function checksum(storage) {
  let sum = 0;
  for (let i = 0; i < storage.length; i++) {
    const id = storage[i];
    if (id !== ".") {
      sum += id * i;
    }
  }
  return sum;
}

function getAnswer() {
  result.textContent = "Calculating...";

  const text = input.value;
  const diskMap = text.split("");
  let answer = 0;

  console.log(diskMap);

  const { storage, freeMap, occupiedMap } = buildStorage(diskMap);
  compact({ storage, freeMap, occupiedMap });
  console.log(storage);

  answer = checksum(storage);

  result.textContent = answer;
  console.log(answer);
  return answer;
}
