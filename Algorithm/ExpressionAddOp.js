function addOperators(str, target) {
  let ret = [];
  function backtrack(path, index, currValue, prevNumber) {
    if (index === str.length) {
      // reach the last digit
      if (currValue === target) {
        ret.push(path);
      }
      return;
    }

    for (let i = index; i < str.length; i++) {
      if (str[index] === "0" && i > index) {
        break;
      }
      let temp = str.substring(index, i + 1);
      let value = parseInt(temp);
      if (index === 0) {
        // special case, first time iter
        backtrack(path + temp, i + 1, value, value);
      } else {
        // + - *
        backtrack(path + "+" + value, i + 1, currValue + value, value);
        backtrack(path + "-" + value, i + 1, currValue - value, -value);
        backtrack(
          path + "*" + value,
          i + 1,
          currValue - prevNumber + value * prevNumber,
          value * prevNumber
        );
      }
    }
  }
  backtrack("", 0, 0, 0);
  return ret;
}
let s = "123",
  target = 6;
let test = addOperators(s, target);
console.log(test);
s = "105";
target = 5;
test = addOperators(s, target);
console.log(test);
