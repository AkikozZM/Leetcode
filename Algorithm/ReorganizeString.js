import { PriorityQueue } from "@datastructures-js/priority-queue";

function reorganizeString(s) {
  let ret = [];
  let pq = new PriorityQueue((a, b) => b[1] - a[1]);
  let freqMap = new Map();
  for (let i = 0; i < s.length; i++) {
    freqMap.set(s[i], (freqMap.get(s[i]) || 0) + 1);
  }
  for (const [char, freq] of freqMap) {
    pq.enqueue([char, freq]);
  }
  while (!pq.isEmpty()) {
    if (pq.size() <= 1) {
      break;
    }
    const [first, firstCount] = pq.dequeue();
    const [second, secondCount] = pq.dequeue();
    ret.push(first);
    ret.push(second);
    if (firstCount - 1 > 0) {
      pq.enqueue([first, firstCount - 1]);
    }
    if (secondCount - 1 > 0) {
      pq.enqueue([second, secondCount - 1]);
    }
  }
  if (pq.size() === 1) {
    // last element
    const [last, lastCount] = pq.dequeue();
    if (lastCount > 1) return "";
    ret.push(last);
  }
  return ret.join("");
}
let s = "aab";
let test = reorganizeString(s);
console.log(test);
