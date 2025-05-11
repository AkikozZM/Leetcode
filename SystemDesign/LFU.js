class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // key - item {value, freq}
    this.freqMap = new Map(); // freq - [keys]
    this.minFreq = 0;
  }
  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }
    // if it has key, update the freq, then return the value
    const item = this.cache.get(key);
    this.updateFreq(key, item);
    return item.value;
  }
  put(key, value) {
    if (!this.cache.has(key)) {
      // check capacity
      if (this.cache.size >= this.capacity) {
        this.evict();
      }
      let item = { value, freq: 1 };
      this.cache.set(key, item);
      this.minFreq = 1;
      if (!this.freqMap.has(1)) {
        this.freqMap.set(1, new Set());
      }
      this.freqMap.get(1).add(key);
    } else {
      // update the value, and freq
      let item = this.cache.get(key);
      item.value = value;
      this.updateFreq(key, item);
    }
  }
  updateFreq(key, item) {
    const oldFreq = item.freq;
    const newFreq = oldFreq + 1;
    if (!this.freqMap.has(newFreq)) {
      this.freqMap.set(newFreq, new Set());
    }
    this.freqMap.get(newFreq).add(key);
    this.freqMap.get(oldFreq).delete(key);
    if (this.freqMap.get(oldFreq).size === 0 && this.minFreq === oldFreq) {
      this.minFreq = newFreq;
    }
    item.freq = newFreq;
  }
  evict() {
    const keys = this.freqMap.get(this.minFreq);
    const lfu = keys.keys().next().value;
    this.cache.delete(lfu);
    keys.delete(lfu);
  }
}

// Input
// ["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]
// Output
// [null, null, null, 1, null, -1, 3, null, -1, 3, 4]
let LFU = new LFUCache(2);
LFU.put(1, 1);
LFU.put(2, 2);
console.log(LFU.get(1));
LFU.put(3, 3);
console.log(LFU.get(2));
console.log(LFU.get(3));
