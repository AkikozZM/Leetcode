function calculator(s) {
  let i = 0;
  function helper() {
    const stack = [];
    let op = "+";
    let num = 0;
    while (i < s.length) {
      const c = s[i];
      i++;
      if (c === " ") continue;
      if (c >= "0" && c <= "9") {
        // c is number
        // compute num now
        const digit = parseInt(c);
        num = num * 10 + digit;
      } else if (c === "(") {
        // go to recurssion
        num = helper();
      } else if (c === ")") {
        break;
      } else {
        if (op === "+") stack.push(num);
        else if (op === "-") stack.push(-num);
        else if (op === "*") stack.push(stack.pop() * num);
        else if (op === "/") stack.push(Math.trunc(stack.pop() / num));
        // reset op, num
        op = c;
        num = 0;
      }
    }
    // Process the last number
    if (op === "+") stack.push(num);
    else if (op === "-") stack.push(-num);
    else if (op === "*") stack.push(stack.pop() * num);
    else if (op === "/") stack.push(Math.trunc(stack.pop() / num));
    return stack.reduce((accu, value) => accu + value, 0);
  }
  return helper();
}
let s = "2*(5+5*2)/3+(6/2+8)";
let test = calculator(s);
console.log(test);
