class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.head = new Node(-1, -1);
    this.tail = new Node(-1, -1);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  get(key) {
    if (!this.cache.has(key)) return -1;
    const node = this.cache.get(key);
    this.#remove(node);
    this.#addToHead(node);
    return node.value;
  }
  put(key, value) {
    if (!this.cache.has(key)) {
      // create new KV
      const node = new Node(key, value);
      this.cache.set(key, node);
      // add to head
      this.#addToHead(node);
      if (this.cache.size > this.capacity) {
        // remove LRU
        const lru = this.tail.prev;
        this.#remove(lru);
        this.cache.delete(lru.key);
      }
    } else {
      // update KV
      const node = this.cache.get(key);
      node.value = value;
      this.cache.set(key, node);
      // remove old
      this.#remove(node);
      // add to head
      this.#addToHead(node);
    }
  }
  #addToHead(node) {
    // head --- new data --- data --- tail
    const oldNext = this.head.next;
    this.head.next = node;
    node.next = oldNext;
    oldNext.prev = node;
    node.prev = this.head;
  }
  #remove(node) {
    let prev = node.prev;
    let next = node.next;
    prev.next = next;
    next.prev = prev;
  }
}
