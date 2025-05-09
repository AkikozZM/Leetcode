class Node {
  constructor(value, next, random) {
    this.value = value;
    this.next = next;
    this.random = random;
  }
}

/**
 * @param {_Node} head
 * @return {_Node}
 */
function copyRandomList(head) {
  if (head === null) {
    return null;
  }
  let ptr = head; // A-B-C
  while (ptr !== null) {
    let node = new Node(ptr.value, null, null);
    node.next = ptr.next;
    ptr.next = node;
    ptr = node.next; // A-A`-B-B`-C-C`
  }
  ptr = head;
  while (ptr !== null) {
    ptr.next.random = ptr.random !== null ? ptr.random.next : null;
    ptr = ptr.next.next;
  }
  let ptr_old = head;
  let ptr_new = head.next;
  let ret = head.next;
  while (ptr_old !== null) {
    ptr_old.next = ptr_old.next.next;
    ptr_new.next = ptr_new.next !== null ? ptr_new.next.next : null;
    ptr_old = ptr_old.next;
    ptr_new = ptr_new.next;
  }
  return ret;
}

function buildList(arr) {
  if (arr.length === 0) return null;
  let nodes = arr.map(([value]) => new Node(value, null, null));
  for (let i = 0; i < arr.length; i++) {
    nodes[i].next = nodes[i + 1] || null;
    nodes[i].random = arr[i][1] !== null ? nodes[arr[i][1]] : null;
  }
  return nodes[0];
}

function printLists(head) {
  let nodes = [];
  let ptr = head;
  while (ptr !== null) {
    nodes.push({
      value: ptr.value,
      next: ptr.next ? ptr.next.value : null,
      random: ptr.random ? ptr.random.value : null,
    });
    ptr = ptr.next;
  }
  console.log(nodes);
}

let head = buildList([
  [7, null],
  [13, 0],
  [11, 4],
  [10, 2],
  [1, 0],
]);
let ret = copyRandomList(head);
printLists(ret);
