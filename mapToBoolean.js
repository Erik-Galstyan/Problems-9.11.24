function mapToBoolean(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("The type of argument must be an array");
  }
  let res = [];
  for (let val of arr) {
      res.push(!!val);
  }
  return res;
}

console.log(mapToBoolean([0, "hello", "", NaN, 42, {}, []])); // [false, true, false, false, true, true, true]