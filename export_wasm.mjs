import * as index_bg from "./index_bg.mjs";

let importsObject = {
  "./index_bg.js": index_bg,
};

export default {
  add(a, b) {
    console.log("Doing something with", importsObject);
    return a + b;
  },
};
