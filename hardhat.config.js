require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-waffle");

const fs = require("fs");
const privateKey = fs.readFileSync(".secret").toString();
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const projectId = "595059c65e204c51a4343dd8bedf8fcf";

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
      //automatically inject accounts
    },
    mumbai: {
      url: `https://https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts: [privateKey],
    },
    mainnet: {
      url: `https://https://polygon-mainnet.infura.io/v3/${projectId}`,
      accounts: [privateKey],
    },
  },

  solidity: "0.8.4",
};
