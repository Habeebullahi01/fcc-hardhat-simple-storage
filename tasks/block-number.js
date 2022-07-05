const { task } = require("hardhat/config")

task("blockNumber", "Prints the current block number").setAction(
  async (provider, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber()
    console.log(`Current Block Number is :${blockNumber}`)
  }
)

module.exports = {}
