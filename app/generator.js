function combinations(arr) {
  let results = [[]];

  for (const subarr of arr) {
    let temp = [];

    for (const item of subarr) {
      for (const t of results) {
        temp.push([...t, item]);
      }
    }

    results = temp;
  }

  return results;
}

function product() {}

const test = {
  a: [1, 2],
  b: [3, 4],
};

console.log(Object.values(test));
