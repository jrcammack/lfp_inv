function convertJsObjToMap(aJsObj) {
  let myMap = new Map();
  for (let property in aJsObj) {
    myMap.set(property, aJsObj[property]);
  }
  return myMap;
}

function getDetailFormFieldToDbMapping() {
  const mapping = new Map();
  mapping.set("brand", "Brand");
  mapping.set("model", "Model");
  mapping.set("generation", "Generation");
  mapping.set("memory", "Memory Size");
  mapping.set("color", "Color");
  mapping.set("mModel", "M-Model");
  mapping.set("aModel", "A-Model");
  mapping.set("batteryHealth", "Battery Health");
  mapping.set("cycles", "");
}

const ProdDetails = {
  BRAND: "brand",
  MODEL: "model",
  GENERATION: "generation",
  MEMORY_SIZE: "memory",
  COLOR: "color",
  M_MODEL: "mModel",
  A_MODEL: "aModel",
  BATTERY_HEALTH: "batteryHealth",
  BATTERY_CYCLE_COUNT: "cycles",
  IMEI: "imei",
  ERASURE_RESULT: "erasure",
  DIAGNOSTIC_RESULT: "diagnostic",
  GENDER: "gender",
  SIZE: "size",
  UPC: "upc",
  CONDITION: "condition",
  NOTES: "notes",
};

module.exports = { convertJsObjToMap, ProdDetails };
