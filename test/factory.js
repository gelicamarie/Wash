const Factory = artifacts.require("Factory");
const { expectEvent } = require("@openzeppelin/test-helpers");

contract("Factory", (accounts) => {
  const [OWNER] = accounts;
  const NAME = "Artwork style";
  const SYMBOL = "ART";
  const IMAGE = "https://dummyimage.com/600x400/000/fff";

  beforeEach(async function () {
    this.factory = await Factory.new();
  });

  it("Should have owner", async function () {
    const nftOwner = await this.factory.owner();
    expect(OWNER).to.equal(nftOwner);
  });

  it("Should match collection of minted NFTs", async function () {
    const nft1 = await this.factory.createNFT(NAME, SYMBOL, IMAGE);
    const collection = await this.factory.getCollection();
    expect(nft1.receipt.rawLogs[0].address === collection[0]);
  });

  it("Should get collection for owner", async function () {
    const nft1 = await this.factory.createNFT(NAME, SYMBOL, IMAGE);
    const nftOwner = await this.factory.owner();
    const collection = await this.factory.getCollectionFrom(nftOwner);
    expect(nft1.receipt.rawLogs[0].address === collection[0]);
  });

  it("Should get create event", async function () {
    const nft = await this.factory.createNFT(NAME, SYMBOL, IMAGE);
    expectEvent(nft.receipt, "NewNFTCreated");
  });
});
