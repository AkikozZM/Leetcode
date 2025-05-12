/**
 * 
 * Example 1:

Input: s = "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()".
Example 2:

Input: s = ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()".
Example 3:

Input: s = ""
Output: 0
 */

function longestValidParentheses(s) {
  let stack = [-1];
  let ret = 0;
  for (let i = 0; i < s.length; i++) {
    const curr = s[i];
    if (curr === "(") {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length === 0) {
        stack.push(i);
      } else {
        ret = Math.max(ret, i - stack[stack.length - 1]);
      }
    }
  }
  return ret;
}
let s = ")()())";
s = "(()";
let test = longestValidParentheses(s);
console.log(test);
