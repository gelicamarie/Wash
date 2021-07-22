/**
 * NFT Minting Testing
 * https://github.com/OpenZeppelin/openzeppelin-team-nft/blob/main/test/OpenZeppelinTeamNFT.test.js
 */

const NFT = artifacts.require("NFT");
const { BN } = require("@openzeppelin/test-helpers");

contract("NFT", (accounts) => {
  const NAME = "Artwork style";
  const SYMBOL = "ART";
  const IMAGE = "https://dummyimage.com/600x400/000/fff";

  beforeEach(async function () {
    this.nft = await NFT.new(accounts[0], NAME, SYMBOL, IMAGE);
  });

  it("Should have correct name", async function () {
    expect(await this.nft.name()).to.equal(NAME);
  });

  it("Should have correct symbol", async function () {
    expect(await this.nft.symbol()).to.equal(SYMBOL);
  });

  it("Should have correct image url", async function () {
    expect(await this.nft.tokenURI(1)).to.equal(IMAGE);
  });
});
