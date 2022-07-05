const { ethers, run, network } = require("hardhat")
require("dotenv").config()

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying contract......")
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(simpleStorage.address)
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for confirmations")
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
    console.log("Verification Over")
  }

  const currentNumber = await simpleStorage.retrieve()
  console.log(`Current Number is:${currentNumber}`)

  const updatedNumberTx = await simpleStorage.store("89")
  await updatedNumberTx.wait(1)
  const updatedNumber = await simpleStorage.retrieve()
  console.log(`Updated Number is:${updatedNumber}`)
}

async function verify(contractAddress, args) {
  console.log("Verification underway.....")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
    console.log("Verifier ran")
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Contract has already been verified.")
    } else {
      console.log(error)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
