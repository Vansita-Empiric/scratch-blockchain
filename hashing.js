const { log } = require("console");
const crypto = require("crypto");

const cryptoHash = (...inputs) => {
  const hash = crypto.createHash("sha256");
  //   hash.update(inputs.join("")); // worldhello
  hash.update(inputs.sort().join("")); // helloworld
  return hash.digest("hex");
};

// const result = cryptoHash("world", "hello");
// log("result: ", result);

module.exports = cryptoHash;
