function findPermutations(s) {
  let unique = new Set();
  function helper(index) {
    if (index === s.length) {
      unique.add(s.join(""));
      return;
    }
    // swap the current index with all possible indices and recur
    for (let i = index; i < s.length; i++) {
      [s[index], s[i]] = [s[i], s[index]];
      helper(i + 1);
      [s[index], s[i]] = [s[i], s[index]];
    }
  }
  s = s.split("");
  helper(0);
  return unique;
}
let ret = findPermutations("ABC");
console.log(ret);
