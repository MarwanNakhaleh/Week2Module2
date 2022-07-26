// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const web3utils = require("web3-utils");
const { padBytes32 } = require("./helpers/bytes_helpers");

async function main() {
  const Voting = await hre.ethers.getContractFactory("Voting");
  const ModifiedVoting = await hre.ethers.getContractFactory("ModifiedVoting");

  const addr1_value = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
  const addr2_value = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
  const addr3_value = "0x90F79bf6EB2c4f870365E785982E1f101E93b906";
  const addr4_value = "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65";
  const addr5_value = "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc";

  const contract_owner = await ethers.getSigner("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
  const addr1 = await ethers.getSigner(addr1_value);
  const addr2 = await ethers.getSigner(addr2_value);
  const addr3 = await ethers.getSigner(addr3_value);
  const addr4 = await ethers.getSigner(addr4_value);
  const addr5 = await ethers.getSigner(addr5_value);

  const givenProposalNames = ["Create a new DAO", "Rugpull our stupid investors"]
  //const bytes32ProposalNames = ["0x647d0d3198d01df1862cf1568524fa0036b52e8e059eef1198376ba38cf13a8b", "0x1f82540bbafe5befd2be100a835d4dbb0077c4d5655f5b9b53fdc878f9afdd17"]
  let bytes32ProposalNames = [];
  givenProposalNames.forEach(proposalName => {
    let proposalBytes = web3utils.asciiToHex(proposalName);
    //let finalProposalBytes = padBytes32(proposalBytes);
    const finalProposalBytes = ethers.utils.hexZeroPad(proposalBytes, 32)
    bytes32ProposalNames.push(finalProposalBytes);
  })

  const modifiedVoting = await ModifiedVoting.connect(contract_owner).deploy(bytes32ProposalNames);

  await modifiedVoting.deployed();
  console.log("ModifiedVoting deployed to: ", modifiedVoting.address);

  await modifiedVoting.giveRightToVote(addr1_value);
  console.log("right to vote given to " + addr1_value);
  await modifiedVoting.giveRightToVote(addr2_value);
  console.log("right to vote given to " + addr2_value);
  await modifiedVoting.giveRightToVote(addr3_value);
  console.log("right to vote given to " + addr3_value);
  await modifiedVoting.giveRightToVote(addr4_value);
  console.log("right to vote given to " + addr4_value);
  await modifiedVoting.giveRightToVote(addr5_value);
  console.log("right to vote given to " + addr5_value);

  const proposals = await modifiedVoting.showProposals();
  // proposals.forEach(proposal => {
  //   console.log(web3utils.hexToAscii(proposal));
  // })
  console.log("voting underway!");
  await modifiedVoting.attach(addr1_value).vote(0);
  console.log("addr1 voted for " + web3utils.hexToAscii(proposals[0]));
  console.log("voting underway!");
  await modifiedVoting.attach(addr2_value).vote(1);
  console.log("addr2 voted for " + web3utils.hexToAscii(proposals[1]));
  console.log("voting underway!");
  await modifiedVoting.attach(addr3_value).vote(0);
  console.log("addr3 voted for " + web3utils.hexToAscii(proposals[0]));
  console.log("voting underway!");
  await modifiedVoting.attach(addr4_value).vote(1);
  console.log("addr4 voted for " + web3utils.hexToAscii(proposals[1]));
  console.log("voting underway!");
  await modifiedVoting.attach(addr5_value).vote(0);
  console.log("addr5 voted for " + web3utils.hexToAscii(proposals[0]));

  // get winner
  await modifiedVoting.connect(contract_owner).closeBallot();
  const winner = await modifiedVoting.winnerName();
  console.log("Winning proposal: " + web3utils.hexToAscii(winner));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
