// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const DemoToken = await hre.ethers.getContractFactory("DemoToken");
  const demoToken = await DemoToken.deploy();

  await demoToken.deployed();


  console.log("DemoToken deployed to:", demoToken.address);


  // try {
  // const StakingContract = await hre.ethers.getContractAt("StakingContract");
  // console.log("getting contract factory");

  // const stakingContract = await StakingContract.deploy(0xdd2fd4581271e230360230f9337d5c0430bf44c0, 0xdd2fd4581271e230360230f9337d5c0430bf44c0, demoToken.address, demoToken.address);
  // console.log("deploying")

  // await stakingContract.deployed();

  // console.log("Staking Contract deployed to: ", stakingContract.address);}
  // catch (error) {
  //   console.log(error)
  // }


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
