class MedianFinder {
  constructor() {
    // try maintain a sorted array
    this.lower = new PriorityQueue((a, b) => b - a);
    this.higher = new PriorityQueue((a, b) => a - b);
    this.size = 0;
  }
  addNum(num) {
    // always push to lower first
    this.lower.enqueue(num);
    this.higher.enqueue(this.lower.dequeue());

    if (this.higher.size() > this.lower.size()) {
      // maintain lower always size >= higher
      this.lower.enqueue(this.higher.dequeue());
    }
    this.size++;
  }
  findMedian() {
    if (this.size % 2 === 0) {
      return (this.lower.front() + this.higher.front()) / 2;
    } else {
      return this.lower.front();
    }
  }
}
let mf = new MedianFinder();
mf.addNum(1);
mf.addNum(2);
console.log(mf.findMedian());
mf.addNum(3);
console.log(mf.findMedian());
