const obj = {
  name: "John",
  address: {
    city: "New York",
    zip: 10001,
    details: {
      street: "5th Ave",
      number: 101
    }
  },
  age: 30,
  skills: null
};

function hasProperties (data, path) {
  if (typeof data != "object" || data == null || !Array.isArray(path)) {
    throw new Error("The type of arguments is wrong")
  }
  for (let val of path) {
    if (typeof val != "string") {
      throw new Error("The path array must contain only strings");
    }
  }
  let res = [];
  let obj = data;
  for (let i = 0; i < path.length; ++i) {
   let curent = path[i];
    curent = curent.split(".");
    obj = data;
    let flag = true;
    for (let j = 0; j < curent.length; ++j) {
      if (curent[j] in obj) {
        if ((typeof obj[curent[j]] != "object" || obj[curent[j]] == null) && j < curent.length - 1) {
          res[i] = false;
          flag = false;
          break;
        } else if (typeof obj[curent[j]] == "object" && obj[curent[j]] != null) {
          obj = obj[curent[j]];
        }
      } else {
        res[i] = false;
        flag = false;
      }
    }
    if (flag) {
      res[i] = true;
    }
  }
  return res;
}


console.log(hasProperties(obj, ["name", "address.city", "address.zip"])); // [true, true, true]
console.log(hasProperties(obj, ["name", "address.city", "address.zip"])); // [true, true, true]
console.log(hasProperties(obj, ["address.details.street", "address.details.floor"])); // [true, false]
console.log(hasProperties(obj, ["skills", "address.details.number", "age"])); // [true, true, true]
console.log(hasProperties(obj, ["address.country", "name.first"])); // [false, false]
console.log(hasProperties(obj, [""])); // [false]
console.log(hasProperties(obj, ["address.details", "address.details.street"])); // [true, true]