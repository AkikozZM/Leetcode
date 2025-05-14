function maxEvent(days) {
  days.sort((a, b) => a[0] - b[0]);
  let queue = [];
  for (let i = 0; i < days.length; i++) {
    const [start, end] = days[i];
    if (queue[0] <= start) {
      queue.shift();
    }
    queue.push(end);
    queue.sort((a, b) => a - b);
  }
  return queue.length;
}
let days = [
  [1, 3],
  [2, 4],
  [3, 5],
];
let test = maxEvent(days);
console.log(test);
