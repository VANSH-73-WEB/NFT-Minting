import { network } from "hardhat";

async function main() {
  const { ethers } = await network.connect();

  const NFT = await ethers.getContractFactory("MyNFT");

  const nft = await NFT.deploy();

  await nft.waitForDeployment();

  console.log(
    "NFT deployed at:",
    await nft.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});