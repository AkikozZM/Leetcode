function findAllConcatenatedWordsInADict(words) {
  function helper(word) {
    let dp = new Array(word.length + 1).fill(0);
    dp[0] = 1;
    for (let i = 1; i <= word.length; i++) {
      for (let j = 0; j < i; j++) {
        const sub = word.substring(j, i);
        if (dp[j] && set.has(sub)) {
          dp[i] = 1;
        }
      }
    }
    return dp[word.length];
  }
  let set = new Set(words);
  let ret = [];
  for (const word of words) {
    set.delete(word);
    if (helper(word)) {
      ret.push(word);
    }
    set.add(word);
  }
  return ret;
}
let words = [
  "cat",
  "cats",
  "catsdogcats",
  "dog",
  "dogcatsdog",
  "hippopotamuses",
  "rat",
  "ratcatdogcat",
];
let test = findAllConcatenatedWordsInADict(words);
console.log(test);
