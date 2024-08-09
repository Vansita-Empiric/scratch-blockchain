const { GENESIS_DATA, MINE_RATE } = require("./config");
const hexToBinary = require("hex-to-binary");
const cryptoHash = require("./hashing");
const { log } = require("console");

class Block {
  constructor({ timestamp, prevHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock({ prevBlock, data }) {
    let hash, timestamp;
    const prevHash = prevBlock.hash;
    let { difficulty } = prevBlock;

    let nonce = 0;
    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({
        originalBlock: prevBlock,
        timestamp,
      });
      hash = cryptoHash(timestamp, prevHash, data, nonce, difficulty);
    } while (
      hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty)
    );

    return new this({
      timestamp,
      prevHash,
      data,
      hash,
      nonce,
      difficulty,
    });
  }

  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock;
    if (difficulty < 1) return 1;
    const difference = timestamp - originalBlock.timestamp;
    if (difference > MINE_RATE) return difficulty - 1;
    return difficulty + 1;
  }
}

const block1 = new Block({
  timestamp: "08/08/24",
  prevHash: "0xabcd",
  hash: "0x1808",
  data: "Hello",
});
// console.log("block1: ", block1);

// const genesisBlock = Block.genesis();
// console.log("Calles genesis block : ", genesisBlock);

// const result = Block.mineBlock({
//   prevBlock: genesisBlock,
//   data: "vansita",
// });

// const result2 = Block.mineBlock({
//     prevBlock: result,
//     data: "vini",
//   });

// log("mining result: ", result);
// log("mining result2: ", result2);

module.exports = Block;
