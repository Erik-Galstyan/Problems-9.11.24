function deepEqual() {
  let flag = true;
  return function f(obj1, obj2) {

    if (typeof obj1 != "object" || obj1 == null || typeof obj2 != "object" || obj2 == null) {
      throw new Error("The type of arguments is wrong");
    }

    let keysObj1 = Object.keys(obj1);
    let keysObj2 = Object.keys(obj2);
    
    
    if (keysObj1.length != keysObj2.length) {
      return false;
    }
    
    keysObj1.sort((a, b) => {if (a > b) return -1});
    keysObj2.sort((a, b) => {if (a > b) return -1});

    for (let i = 0; i < keysObj1.length; ++i) {
      if (keysObj1[i] != keysObj2[i]) {
        flag = false;
      } else if (typeof obj1[keysObj1[i]] != typeof obj2[keysObj2[i]]) {
        flag = false;
      } else if (Array.isArray(obj1[keysObj1[i]]) && !Array.isArray(obj2[keysObj2[i]]) || !Array.isArray(obj1[keysObj1[i]]) && Array.isArray(obj2[keysObj2[i]])) {
        flag = false;
      } else {
        if (typeof obj1[keysObj1[i]] == "object" && obj1[keysObj1[i]] != null) {        
          f(obj1[keysObj1[i]], obj2[keysObj2[i]]);
        } else {
          if (Number.isNaN(obj1[keysObj1[i]]) && !Number.isNaN(obj2[keysObj2[i]]) || !Number.isNaN(obj1[keysObj1[i]]) && Number.isNaN(obj2[keysObj2[i]])) {
            flag = false;
          } else if (obj1[keysObj1[i]] != obj2[keysObj2[i]]){
            flag = false;
          }
        }
      }
    }
    return flag;
  } 
  
}
console.log(deepEqual()(obj1, obj2)); // true


