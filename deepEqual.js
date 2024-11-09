
const obj1 = { b: { c: 2 }, a: 1, g: NaN };
const obj2 = { a: 1, b: { c: 2 }, g: NaN };
const obj3 = { a: 1, b: { c: 3 }, g: NaN };
const obj4 = { a: 1, b: { c: 2 }, g: undefined };
const obj5 = { a: 1, b: { c: 2 }, g: NaN, d: 4 };

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
      const data1 = obj1[keysObj1[i]];
      const data2 = obj2[keysObj2[i]];
      if (keysObj1[i] != keysObj2[i]) {
        flag = false;
      } else if (typeof data1 != typeof data2) {
        flag = false;
      } else if (Array.isArray(data1) && !Array.isArray(data2) || !Array.isArray(data1) && Array.isArray(data2)) {
        flag = false;
      } else {
        if (typeof data1 == "object" && data1 != null) {        
          f(data1, data2);
        } else {
          if (Number.isNaN(data1) && Number.isNaN(data2)) {
            continue;
          } else if (Number.isNaN(data1) && !Number.isNaN(data2) || !Number.isNaN(data1) && Number.isNaN(data2)) {
            flag = false;
          } else if (data1 != data2){            
            flag = false;
          }
        }
      }
    }
    return flag;
  } 
  
}
console.log(deepEqual()(obj1, obj2)); // true
console.log(deepEqual()(obj1, obj2)); // true
console.log(deepEqual()(obj1, obj3)); // false
console.log(deepEqual()(obj1, obj4)); // false
console.log(deepEqual()(obj1, obj5)); // false
console.log(deepEqual()([1, 2, { a: 3 }], [1, 2, { a: 3 }])); // true
console.log(deepEqual()([1, 2, { a: 3 }], [1, 2, { a: 4 }])); // false
console.log(deepEqual()({ x: NaN }, { x: NaN })); // true
console.log(deepEqual()({ x: NaN }, { x: 1 }));   // false


