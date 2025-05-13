function parse(s) {
  let freq = new Map();
  let queue = [];
  let ret = "";
  for (const c of s) {
    // update freq of c
    freq.set(c, (freq.get(c) || 0) + 1);
    if (freq.get(c) === 1) {
      // push to queue
      queue.push(c);
    }
    while (queue.length && freq.get(queue[0]) > 1) {
      queue.shift();
    }
    ret += queue.length > 0 ? queue[0] : "#";
  }
  return ret;
}
let s = "aabc";
let test = parse(s);
console.log(test);
s = "aaaa";
test = parse(s);
console.log(test);
s = "aabbcdcc";
test = parse(s);
console.log(test);
