require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();


const { PRIVATE_KEY, PROJECT_ID , ETHERSCAN_API_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${PROJECT_ID}`,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    }},
  etherscan: {
      apiKey: ETHERSCAN_API_KEY,
    },
  solidity: "0.8.19",
};
