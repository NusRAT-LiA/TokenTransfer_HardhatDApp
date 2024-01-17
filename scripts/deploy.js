const { ethers, run, network } = require("hardhat");

async function main() {
  // Get the contract factory
  const MyToken = await ethers.getContractFactory("MyToken");

  // Deploy the contract
  console.log("Deploying contract...");
  const myToken = await MyToken.deploy();


  // Print the contract address
  console.log(`Contract deployed to: ${myToken.target}`);

  
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...")

    await myToken.deploymentTransaction().wait(6)
    await verify(myToken.target, [])
  }
  
  const ownerBalance = await myToken.balanceOf("0xF94C794EC527Ab8489040F27E9592DE4F9b27E4B");
  console.log(`Owner's Balance : ${ownerBalance}`);

  const TxResponse = await myToken.earnAdditionalBalance(5);
  await TxResponse.wait(1);

  const ownerBalance2 = await myToken.balanceOf("0xF94C794EC527Ab8489040F27E9592DE4F9b27E4B");
  console.log(`Owner's Balance : ${ownerBalance2}`);

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
