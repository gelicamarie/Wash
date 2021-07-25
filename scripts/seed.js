const hre = require("hardhat");

async function main() {
  const MarketPlace = await hre.ethers.getContractFactory("Marketplace");
  const market = await MarketPlace.deploy();

  await market.deployed();

  console.log("Market deployed to: ", market.address);

  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(market.address);
  await nft.deployed();
  console.log("NFT deployed to: ", nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
