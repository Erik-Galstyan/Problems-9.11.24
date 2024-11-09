const user = { name: "Alice", address: { city: "Wonderland" } };

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


console.log(hasProperties(user, ["name", "address.city", "address.zip"]));