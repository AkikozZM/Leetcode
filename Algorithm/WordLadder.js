function ladderLength(begin, end, wordList) {
  // bfs
  let words = new Set(wordList);
  if (!words.has(end)) return 0; // edge case, end is not in wordlist

  let queue = [begin];
  let visited = new Set();
  visited.add(begin);
  let total = 1;
  while (queue.length) {
    let size = queue.length;
    while (size) {
      let word = queue.shift();
      if (word === end) {
        return total;
      }
      for (let i = 0; i < word.length; i++) {
        // try each letter of the word
        for (const char of "abcdefghijklmnopqrstuvwxyz") {
          const newWord = word.substring(0, i) + char + word.substring(i + 1);
          if (!visited.has(newWord) && words.has(newWord)) {
            visited.add(newWord);
            queue.push(newWord);
          }
        }
      }
      size--;
    }
    total++;
  }
  return 0;
}
let wordList = ["hot", "dot", "dog", "lot", "log", "cog"];
let test = ladderLength("hit", "cog", wordList);
console.log(test);
