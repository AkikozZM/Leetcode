let s = "113";
let ret = new Set();
const n = s.length;
let visited = new Array(n).fill(false);

function dfs(ret, curr, str) {
  if (curr.length === str.length) {
    ret.add(curr);
    return;
  }
  for (let i = 0; i < str.length; i++) {
    if (visited[i]) {
      continue;
    }
    visited[i] = true;
    dfs(ret, curr + str[i], str);
    visited[i] = false;
  }
}
dfs(ret, "", s);
console.log(ret);
