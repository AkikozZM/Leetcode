/**
Example 1:

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
Example 2:

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
 */

function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }
  const n = nums1.length,
    m = nums2.length;
  let low = 0,
    high = n;
  while (low <= high) {
    const A = Math.floor((low + high) / 2);
    const B = Math.floor((n + m + 1) / 2) - A;
    let A_left = A === 0 ? -Infinity : nums1[A - 1];
    let A_right = A === n ? Infinity : nums1[A];

    let B_left = B === 0 ? -Infinity : nums2[B - 1];
    let B_right = B === m ? Infinity : nums2[B];

    if (A_left <= B_right && B_left <= A_right) {
      if ((m + n) % 2 === 0) {
        return (Math.max(A_left, B_left) + Math.min(A_right, B_right)) / 2;
      } else {
        return Math.max(A_left, B_left);
      }
    } else if (A_left > B_right) {
      high = A - 1;
    } else {
      low = A + 1;
    }
  }
}
let nums1 = [1, 2],
  nums2 = [3, 4];
let test = findMedianSortedArrays(nums1, nums2);
console.log(test);
