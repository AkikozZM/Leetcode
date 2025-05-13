let arr = [
  [1, 2, 3, 4, 5],
  [2, 3, 4, 5, 6],
];

let d_cpy = [];
for (let i = 0; i < arr.length; i++) {
  let temp = [];
  for (const each of arr[i]) {
    temp.push(each);
  }
  d_cpy.push(temp);
}

let d_cpy2 = arr.map((item) => [...item]);
d_cpy[0][1] = 100;
d_cpy2[0][2] = 200;
console.log(arr);
console.log(d_cpy);
console.log(d_cpy2);
