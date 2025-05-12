/**
 * Example 1:

Input: s = "()"

Output: true

Example 2:

Input: s = "()[]{}"

Output: true

Example 3:

Input: s = "(]"

Output: false

Example 4:

Input: s = "([])"

Output: true
 */
function isValid(s) {
  let map = {
    ")": "(",
    "]": "[",
    "}": "{",
  };
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    const curr = s[i];
    if (map[curr] && stack[stack.length - 1] === map[curr]) {
      stack.pop();
    } else {
      stack.push(curr);
    }
  }
  return stack.length === 0;
}

let s = "()[]{}";
let test = isValid(s);
console.log(test);
