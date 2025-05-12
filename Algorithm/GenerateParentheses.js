/**
 * 
 * Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
Example 2:

Input: n = 1
Output: ["()"]
 */
function generateParenthesis(n) {
  let ret = [];
  function backtrack(left, right, curr) {
    if (left === 0 && right === 0) {
      ret.push(curr);
      return;
    }
    if (left > 0) {
      backtrack(left - 1, right, curr + "(");
    }
    if (right > left) {
      backtrack(left, right - 1, curr + ")");
    }
  }
  backtrack(n, n, "");
  return ret;
}

let test = generateParenthesis(4);
console.log(test);
