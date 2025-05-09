/**
 * A string of digits is balanced if the sum of the digits at even indices is equal to the sum of the digits at odd indices.
 * @param {string} num
 * @return {number} the number of distinct permutations of num that are balanced
 */
function countBalancedPermutations(num) {
  let permutations = [num[0]];
  for (let i = 1; i < num.length; i++) {
    const currPermutations = [];
    const currChar = num[i];
    for (const perm of permutations) {
      for (let j = 0; j <= perm.length; j++) {
        currPermutations.push(perm.slice(0, j) + currChar + perm.slice(j));
      }
    }
    permutations = currPermutations;
  }
  let distinct = 0;
  let set = new Set(permutations);
  for (const permutation of set) {
    let sum_odd = 0,
      sum_even = 0;
    for (let i = 0; i < permutation.length; i++) {
      if (i % 2 === 0) {
        sum_even += Number(permutation[i]);
      } else {
        sum_odd += Number(permutation[i]);
      }
    }
    if (sum_even === sum_odd) {
      distinct++;
    }
  }

  console.log(permutations);
  return distinct;
}

let ret = countBalancedPermutations("112");
console.log(ret);
