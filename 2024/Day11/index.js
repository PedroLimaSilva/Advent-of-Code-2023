const input = document.getElementById("input");
const submitButton = document.getElementById("submit");
const result = document.getElementById("result");

submitButton.addEventListener("click", getAnswer);

/**
 * If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
 * If the stone is engraved with a number that has an even number of digits, it is replaced by two stones.
 *    The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone.
 *    (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
 * If none of the other rules apply, the stone is replaced by a new stone;
 *  the old stone's number multiplied by 2024 is engraved on the new stone.
 */
function applyRule(stone) {
  const res = [];
  // console.log("applyRule", stone);
  if (stone === "0") {
    res.push("1");
  } else if (stone.length % 2 === 0) {
    res.push(
      +stone.substring(0, stone.length / 2),
      +stone.substring(stone.length / 2)
    );
  } else {
    res.push(+stone * 2024);
  }

  // console.log("res", res);
  return res;
}

function blink(stonesMap) {
  const changeLog = {};
  Object.keys(stonesMap).forEach((stoneNumber) => {
    const stoneKey = stoneNumber + "";
    const res = applyRule(stoneKey);
    changeLog[stoneKey] = (changeLog[stoneKey] ?? 0) - stonesMap[stoneKey];
    res.forEach((newStone) => {
      changeLog[newStone] = (changeLog[newStone] ?? 0) + stonesMap[stoneKey];
    });
  });
  Object.keys(changeLog).forEach((key) => {
    stonesMap[key] = (stonesMap[key] ?? 0) + changeLog[key];
  });

  // const newStones = [];
  // for (let i = 0; i < stones.length; i++) {
  //   const stone = stones[i];
  //   const res = applyRule(stone + "");
  //   newStones.push(...res);
  // }
  // return newStones;
}

function getAnswer() {
  result.textContent = "Calculating...";

  const text = input.value;
  const stones = text.split(" ");

  let stoneCountMap = stones.reduce((accum, curr) => {
    if (accum[curr] !== undefined) {
      accum[curr]++;
    }
    accum[curr] = 1;
    return accum;
  }, {});

  console.log(stoneCountMap);

  for (let i = 0; i < 75; i++) {
    blink(stoneCountMap);
    console.log(stoneCountMap);
  }

  const answer = Object.keys(stoneCountMap).reduce(
    (acc, key) => acc + stoneCountMap[key],
    0
  );
  console.log(answer);
  result.textContent = answer;
  return answer;
}
