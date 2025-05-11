/**
 * @param {number[]} nums
 * @return {number} subarray with the largest sum
 */
function maxSubArray(nums) {
  let sum = nums[0];
  let large = nums[0];
  for (let i = 1; i < nums.length; i++) {
    sum = Math.max(sum + nums[i], nums[i]);
    large = Math.max(large, sum);
  }
  return large;
}

let nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
let test = maxSubArray(nums);
console.log(test);
nums = [5, 4, -1, 7, 8];
test = maxSubArray(nums);
console.log(test);
nums = [-1];
test = maxSubArray(nums);
console.log(test);
