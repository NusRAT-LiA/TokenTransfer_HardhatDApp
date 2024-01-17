const { ethers, run, network } = require("hardhat");

async function main() {
  // Get the contract factory
  const MyToken = await ethers.getContractFactory("MyToken");

  // Deploy the contract
  console.log("Deploying contract...");
  const myToken = await MyToken.deploy();


  // Print the contract address
  console.log(`Contract deployed to: ${myToken.target}`);

  process.exit(0);
}

const verify = async (contractAddress, args) => {
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else {
      console.log(e)
    }
  }}

// Run the main function
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
