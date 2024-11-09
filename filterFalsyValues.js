function filterFalsyValues(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("The type of argument must be an array");
  }
  let res = [];
  for (let val of arr) {
    if (Boolean(val)) {
      res.push(val);
    }
  }
  return res;
}

console.log(filterFalsyValues([0, 1, "", "hello", null, undefined, false, 42])); // [1, "hello", 42]