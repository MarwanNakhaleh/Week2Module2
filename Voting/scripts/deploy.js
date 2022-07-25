// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Voting = await hre.ethers.getContractFactory("Voting");
  const ModifiedVoting = await hre.ethers.getContractFactory("ModifiedVoting");

  const givenProposalNames = ["Create a new DAO", "Rugpull our stupid investors"]
  const bytes32ProposalNames = ["0x647d0d3198d01df1862cf1568524fa0036b52e8e059eef1198376ba38cf13a8b", "0x1f82540bbafe5befd2be100a835d4dbb0077c4d5655f5b9b53fdc878f9afdd17"]

  const voting = await Voting.deploy(bytes32ProposalNames)
  const modifiedVoting = await ModifiedVoting.deploy(bytes32ProposalNames)

  await voting.deployed();
  await modifiedVoting.deployed();
  console.log("Voting deployed to:", voting.address);
  console.log("ModifiedVoting deployed to:", modifiedVoting.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
