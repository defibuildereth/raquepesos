const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Our Demo Token", function () {

  let demoToken;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function() {

    const DemoToken = await ethers.getContractFactory("DemoToken");
    demoToken = await DemoToken.deploy();
    await demoToken.deployed();

    [owner, addr1, addr2] = await ethers.getSigners();

  });

  it("Should successfully deploy", async function () {
    console.log("success")
  });

  it("Should deploy with 1m of supply for the owner of the contract", async function() {
    console.log(await demoToken.decimals());

    const decimals = await demoToken.decimals();
    const balance = await demoToken.balanceOf(owner.address);
    console.log(ethers.utils.formatEther(balance));
    expect(ethers.utils.formatEther(balance) == 1000000);
  });

  it("Should let you send tokens to another address", async function() {
    await demoToken.transfer(addr1.address, ethers.utils.parseEther("100"));
    expect(await demoToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("100"));
  })

  it("Should let you give another address the approval to send on your behalf", async function() {
    await demoToken.connect(addr1).approve(owner.address, ethers.utils.parseEther("1000"));
    await demoToken.transfer(addr1.address, ethers.utils.parseEther("2000"));
    await demoToken.transferFrom(addr1.address, addr2.address, ethers.utils.parseEther("1000"));
    expect(await demoToken.balanceOf(addr2.address)).to.equal(ethers.utils.parseEther("1000"));
    expect(await demoToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("1000"));
  })

  it("Should let users stake tokens", async function () {
    await demoToken.transfer(addr1.address, ethers.utils.parseEther("2000"));
    await demoToken.connect(addr1).createStake(ethers.utils.parseEther("1000"));

    // await demoToken.createStake(1000);
    expect(await demoToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("1000"));

  })

  it("Should show a staking balance", async function () {
    await demoToken.transfer(addr1.address, ethers.utils.parseEther("2000"));
    await demoToken.connect(addr1).createStake(ethers.utils.parseEther("1000"));

    expect(await demoToken.totalStakes()).to.equal(ethers.utils.parseEther("1000"));
  })

  it("Should have some rewards", async function () {
    await demoToken.transfer(addr1.address, ethers.utils.parseEther("10000"));
    await demoToken.connect(addr1).createStake(ethers.utils.parseEther("10000"));

    await network.provider.send("evm_increaseTime", [3600]);



    console.log(ethers.utils.formatEther(await demoToken.connect(addr1).calculateReward(addr1.address)));
  })
});
