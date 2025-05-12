function maximalSquare(grid) {
  const n = grid.length,
    m = grid[0].length;
  let ret = 0;
  let dp = new Array(n).fill().map(() => new Array(m).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === "1") {
        // not in the first row or col
        if (i > 0 && j > 0) {
          dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1;
        } else {
          dp[i][j] = 1;
        }
        ret = Math.max(ret, dp[i][j]);
      }
    }
  }
  return ret * ret;
}
let grid = [
  ["1", "0", "1", "0", "0"],
  ["1", "0", "1", "1", "1"],
  ["1", "1", "1", "1", "1"],
  ["1", "0", "0", "1", "0"],
];
let test = maximalSquare(grid);
console.log(test);
