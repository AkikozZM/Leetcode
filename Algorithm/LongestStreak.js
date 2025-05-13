function longestStreak(movies, fav) {
  let set = new Set();
  let left = 0;
  let total = -1;
  let hasFav = false;
  for (let right = 0; right < movies.length; right++) {
    const curr = movies[right];
    if (curr === fav) {
      hasFav = true;
    }
    while (set.has(curr)) {
      set.delete(movies[left]);
      if (movies[left] === fav) {
        hasFav = false;
      }
      left++;
    }
    set.add(curr);
    if (hasFav) {
      total = Math.max(total, right - left + 1);
    }
  }
  return total;
}
let movies = ["A", "B", "C", "A", "D"];
let test = longestStreak(movies, "C");
console.log(test);
