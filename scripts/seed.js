const hre = require("hardhat");
const NFT = require("../artifacts/contracts/NFT.sol/NFT.json");
const MarketPlace = require("../artifacts/contracts/Marketplace.sol/Marketplace.json");

const MARKET_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const NFT_CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const HOSTNAME = "http://localhost:3000";
const TOKEN_LOCATION = `${HOSTNAME}/api/tokens`;

async function main() {
  const provider = new hre.ethers.providers.JsonRpcProvider();
  const signer = await provider.getSigner();

  const nftContract = new hre.ethers.Contract(
    NFT_CONTRACT_ADDRESS,
    NFT.abi,
    signer
  );

  // Generate NFTs
  await Promise.all(
    [...Array(8).keys()].map(async (i) => {
      await nftContract.createNFT(`${TOKEN_LOCATION}/${i}`);
    })
  );

  const marketplaceContract = new hre.ethers.Contract(
    MARKET_CONTRACT_ADDRESS,
    MarketPlace.abi,
    signer
  );

  const listingPrice = await marketplaceContract.getListingPrice();

  // List on marketplace
  await Promise.all(
    [...Array(8).keys()].map(async (i) => {
      await marketplaceContract.createNewNFT(
        nftContract.address,
        i + 1,
        hre.ethers.utils.parseUnits((i + 1).toString(), "ether"),
        { value: listingPrice }
      );
    })
  );

  let items = await marketplaceContract.getCollection();
  items = await Promise.all(
    items.map(async ({ price, seller, owner, tokenId }) => {
      const tokenUri = await nftContract.tokenURI(tokenId);
      let item = {
        price: price.toString(),
        tokenId: tokenId.toString(),
        seller,
        owner,
        tokenUri,
      };
      return item;
    })
  );

  console.log(items);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
