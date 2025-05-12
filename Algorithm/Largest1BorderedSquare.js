function opimalSolution(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let left = new Array(rows).fill().map(() => new Array(cols).fill(0));
  let top = new Array(rows).fill().map(() => new Array(cols).fill(0));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j]) {
        left[i][j] = j > 0 ? left[i][j - 1] + 1 : 1;
        top[i][j] = i > 0 ? top[i - 1][j] + 1 : 1;
      }
    }
  }
  let maxSize = 0;
  for (let i = rows - 1; i >= 0; i--) {
    for (let j = cols - 1; j >= 0; j--) {
      for (let size = Math.min(left[i][j], top[i][j]); size > maxSize; size--) {
        if (left[i - size + 1][j] >= size && top[i][j - size + 1] >= size) {
          maxSize = size;
          break;
        }
      }
    }
  }
  return maxSize * maxSize;
}

/**
 * @param {number[][]} grid Given a 2D grid of 0s and 1s,
 * return the number of elements in the largest square subgrid that has all 1s on its border,
 * or 0 if such a subgrid doesn't exist in the grid.
 * @return {number}
 */
function largest1BorderedSquare(grid) {
  const rows = grid.length,
    cols = grid[0].length;
  let maxSize = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      for (let size = 0; i + size < rows && j + size < cols; size++) {
        if (has1InBorder(i, j, i + size, j + size)) {
          maxSize = Math.max(maxSize, size + 1);
        }
      }
    }
  }
  function has1InBorder(i, j, di, dj) {
    if (
      i < 0 ||
      j < 0 ||
      i >= rows ||
      j >= cols ||
      di < 0 ||
      dj < 0 ||
      di >= rows ||
      dj >= cols
    ) {
      return false;
    }
    for (let row = i; row <= di; row++) {
      if (!grid[row][j]) return false;
      if (!grid[row][dj]) return false;
    }
    for (let col = j; col <= dj; col++) {
      if (!grid[i][col]) return false;
      if (!grid[di][col]) return false;
    }
    return true;
  }
  return maxSize * maxSize;
}

let grid = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];
let test = opimalSolution(grid);
console.log(test);
