const { ethers, waffle } = require("hardhat");
const { expect, assert } = require("chai");

describe("MyToken Contract", function () {
  let MyToken;
  let myToken;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();

    MyToken = await ethers.getContractFactory("MyToken");
    myToken = await MyToken.deploy();
  });




  it("should check the owner's balance before deployment and after addition", async function () {
    const ownerBalanceBefore = await myToken.balanceOf(owner.address);
    const expectedBeforeBal = "5" ;
    assert(ownerBalanceBefore.toString(),expectedBeforeBal);

    await myToken.earnAdditionalBalance(5);

    const ownerBalanceAfter = await myToken.balanceOf(owner.address);
    const expectedAfterBal = "10" ;
    assert(ownerBalanceAfter.toString(),expectedAfterBal);

  });
});
