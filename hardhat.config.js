require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();
require("hardhat-deploy");
require("hardhat-deploy-ethers");

const { PRIVATE_KEY, PROJECT_ID , ETHERSCAN_API_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      chainId: 31337,
      // gasPrice: 130000000000,
  },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${PROJECT_ID}`,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    }},
  etherscan: {
      apiKey: ETHERSCAN_API_KEY,
    },
  solidity: "0.8.19",
  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer from accounts: [PRIVATE_KEY] , its first key if given multiple
        1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
},
};
