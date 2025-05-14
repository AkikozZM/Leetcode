function topKFrequent(words, k) {
  let freqMap = new Map();
  let ret = [];
  for (let i = 0; i < words.length; i++) {
    freqMap.set(words[i], (freqMap.get(words[i]) || 0) + 1);
  }
  let arr = Array.from(freqMap).sort((a, b) => {
    if (a[1] !== b[1]) {
      return b[1] - a[1];
    } else {
      // alphabetically
      return a[0].localeCompare(b[0]);
    }
  });
  return arr.slice(0, k).map((item) => item[0]);
}
let words = [
  "the",
  "day",
  "is",
  "sunny",
  "the",
  "the",
  "the",
  "sunny",
  "is",
  "is",
];
let test = topKFrequent(words, 4);
console.log(test);
