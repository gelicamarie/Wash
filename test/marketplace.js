/**
 * NFT Minting Testing
 * https://github.com/OpenZeppelin/openzeppelin-team-nft/blob/main/test/OpenZeppelinTeamNFT.test.js
 */

const NFT = artifacts.require("NFT");
const Marketplace = artifacts.require("Marketplace");
const { expectEvent } = require("@openzeppelin/test-helpers");

contract("Marketplace", (accounts) => {
  const TOKEN_LOCATION = "http://example.com";

  beforeEach(async () => {
    this.marketplace = await Marketplace.new();
    this.nft = await NFT.new(this.marketplace.address);
  });

  it("Listing an item", async () => {
    let listingPrice = await this.marketplace.getListingPrice();
    listingPrice = listingPrice.toString();

    await this.nft.createNFT(TOKEN_LOCATION);

    const auctionPrice = ethers.utils.parseUnits("1", "ether");
    await this.marketplace.createNewNFT(this.nft.address, 1, auctionPrice, {
      value: listingPrice,
    });

    let items = await this.marketplace.getCollection();
    items = await Promise.all(
      items.map(async ({ price, seller, owner, tokenId }) => {
        const tokenUri = await this.nft.tokenURI(tokenId);
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

    expect(items[0].seller).equal(accounts[0]);
    expect(items[0].tokenId).equal("1");
    expect(items[0].tokenUri).equal(TOKEN_LOCATION);
  });

  it("Execute a sale", async () => {
    let listingPrice = await this.marketplace.getListingPrice();
    listingPrice = listingPrice.toString();

    await this.nft.createNFT(`${TOKEN_LOCATION}/1`);
    await this.nft.createNFT(`${TOKEN_LOCATION}/2`);

    await this.marketplace.createNewNFT(
      this.nft.address,
      1,
      ethers.utils.parseUnits("1", "ether"),
      { value: listingPrice }
    );

    await this.marketplace.createNewNFT(
      this.nft.address,
      2,
      ethers.utils.parseUnits("10", "ether"),
      { value: listingPrice }
    );

    const transaction = await this.marketplace.createMarketTransaction(
      this.nft.address,
      2,
      { value: ethers.utils.parseUnits("10", "ether") }
    );

    expectEvent(transaction.receipt, "SaleTransaction");
  });
});

//856965faec11ea1bea36bf741e2245321bdc348b6a82849e33e56b0a64feceeb
