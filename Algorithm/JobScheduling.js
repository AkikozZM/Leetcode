/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number[]} profit
 * @return {number} return the maximum profit such that there are no two jobs overlapped time range.
 */
function jobScheduling(input) {
  const [{ startTime, endTime, profit }] = input;
  const n = startTime.length;
  //   console.log(n);
  let dp = new Array(n + 1);
  dp[0] = 0;
  let jobs = [];
  for (let i = 0; i < n; i++) {
    jobs.push([startTime[i], endTime[i], profit[i]]);
  }
  jobs.sort((a, b) => a[1] - b[1]);
  for (let i = 0; i < n; i++) {
    let p = jobs[i][2];
    let left = 0,
      right = i;
    let start = jobs[i][0];
    while (left < right) {
      let mid = Math.floor((right + left) / 2);
      if (jobs[mid][1] <= start) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    dp[i + 1] = Math.max(dp[i], dp[left] + p);
  }

  return dp[n];
}

let startTime = [1, 2, 3, 3];
let endTime = [3, 4, 5, 6];
let profit = [50, 10, 40, 70];
let input = [{ startTime, endTime, profit }];
let maxProfit = jobScheduling(input);
console.log(maxProfit);
