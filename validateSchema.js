const schema = {
  name: { type: "string", minLength: 2 },
  age: { type: "number", min: 18 },
  isActive: { type: "boolean" },
  tags: { type: "array", itemType: "string" },
};
const obj = { name: "Alice", age: 25, isActive: true, tags: ["admin", "user"] };


function validateSchema(obj, schema) {
  if (typeof obj != "object" && obj == null || typeof schema != "object" && schema == null) {
    throw new Error("The type of arguments is wrong")
  }
  for (let key in obj) {
    if (typeof obj[key] != schema[key].type && !Array.isArray(obj[key]) || schema[key].type == "array" && !Array.isArray(obj[key])) {
      return false;
    } else {
      if (typeof obj[key] == "string") {
        if ("minLength" in schema[key]) {
          if (obj[key].length < schema[key].minLength) {
            return false
          }
        }
        if ("maxLength" in schema[key]) {
          if (obj[key].length > schema[key].maxLength) {
            return false;
          }
        }
      } else if (typeof obj[key] == 'number') {
        if ("min" in schema[key]) {
          if (obj[key].length < schema[key].min) {
            return false;
          }
        }
        if ("max" in schema[key]) {
          if (obj[key].length > schema[key].max) {
            return false
          }
        }
      } else if (Array.isArray(obj[key])) {
        if (!(obj[key].every(item => typeof item == schema[key].itemType))) {
          return false;
        }
      }
    }
  }
  return true;
}
console.log(validateSchema(obj, schema)); // true

