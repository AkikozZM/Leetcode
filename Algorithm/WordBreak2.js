function wordBreak(s, wordDict) {
  function backtrack(index) {
    if (memo.has(index)) return memo.get(index);
    let ret = [];
    if (index >= n) {
      // out of bound
      ret.push("");
      return ret;
    }
    for (let i = index + 1; i <= n; i++) {
      const subStr = s.substring(index, i);
      if (words.has(subStr)) {
        const results = backtrack(i);
        for (const result of results) {
          ret.push((subStr + " " + result).trim());
        }
      }
    }
    memo.set(index, ret);
    return ret;
  }

  const n = s.length;
  let words = new Set(wordDict);
  let memo = new Map();
  return backtrack(0);
}
let s = "catsanddog";
let wordDict = ["cat", "cats", "and", "sand", "dog"];
let test = wordBreak(s, wordDict);
console.log(test);
let bbb = "catcatvas";
console.log(bbb.substring(0, bbb.length));
