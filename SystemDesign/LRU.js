class LRUCache {
  constructor(cap) {
    this.cap = cap;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, val) {
    if (!this.cache.has(key)) {
      this.cache.set(key, val);
    } else {
      this.cache.delete(key);
      this.cache.set(key, val);
    }
    if (this.cache.size > this.cap) {
      // evict LRU
      const lru = this.cache.keys().next().value;
      this.cache.delete(lru);
    }
  }
}
let lruCache = new LRUCache(2);
console.log(lruCache.put(1, 1));
console.log(lruCache.put(2, 2));
console.log(lruCache.get(1));
console.log(lruCache.put(3, 3));
console.log(lruCache.get(2));
console.log(lruCache.put(4, 4));
console.log(lruCache.get(1));
console.log(lruCache.get(3));
console.log(lruCache.get(4));
