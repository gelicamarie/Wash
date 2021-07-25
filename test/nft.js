/**
 * NFT Minting Testing
 * https://github.com/OpenZeppelin/openzeppelin-team-nft/blob/main/test/OpenZeppelinTeamNFT.test.js
 */

const NFT = artifacts.require("NFT");

contract("NFT", (accounts) => {
  const TOKEN_LOCATION = "http://example.com";

  it("Create a NFT", async () => {
    const nft = await NFT.new(accounts[0]);
    const nftAddress = nft.address;

    await nft.createNFT(TOKEN_LOCATION, { from: accounts[1] });

    expect(await nft.name()).equals("Wash Marketplace");
    expect(await nft.symbol()).equals("WASH");
    expect(await nft.tokenURI(1)).equals(TOKEN_LOCATION);
  });
});
