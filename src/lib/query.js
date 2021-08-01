import { ethers } from "ethers";

import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import MarketPlace from "../../artifacts/contracts/Marketplace.sol/Marketplace.json";

import { MARKET_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS } from "../lib/config";

// Setup ether clients
// We setup once and can reuse them
export const WEB3_PROVIDER = ethers.providers.Web3Provider;
export const ETHER_PROVIDER = new ethers.providers.JsonRpcProvider();
export const NFT_CONTRACT = new ethers.Contract(
  NFT_CONTRACT_ADDRESS,
  NFT.abi,
  ETHER_PROVIDER
);
export const MARKETPLACE_CONTRACT = new ethers.Contract(
  MARKET_CONTRACT_ADDRESS,
  MarketPlace.abi,
  ETHER_PROVIDER
);

/**
 * Get all the listed artworks
 */
export const getCollection = async () => {
  const inventory = await MARKETPLACE_CONTRACT.getCollection();

  const items = await Promise.all(
    inventory.map(async (i) => {
      const tokenURI = await NFT_CONTRACT.tokenURI(i.tokenId);
      // Fetch nft data
      const meta = await fetch(tokenURI).then((res) => res.json());

      //converts price to ether
      const price = ethers.utils.formatUnits(i.price.toString(), "ether");

      return {
        id: i.tokenId.toNumber(),
        price,
        creator: i.seller,
        owner: i.owner,
        url: meta.image,
        title: meta.name,
        description: meta.description,
      };
    })
  );

  return items;
};

/**
 * Get artwork given a token ID
 * @param {string} tokenId
 */
export const getArtwork = async (tokenId) => {
  let artwork;
  try {
    artwork = await MARKETPLACE_CONTRACT.getArtwork(tokenId);
  } catch (e) {
    throw e;
  }

  const tokenURI = await NFT_CONTRACT.tokenURI(artwork.tokenId);

  // Fetch nft data
  const meta = await fetch(tokenURI).then((res) => res.json());

  //converts price to ether
  const price = ethers.utils.formatUnits(artwork.price.toString(), "ether");

  return {
    id: artwork.tokenId.toNumber(),
    price,
    creator: artwork.seller,
    owner: artwork.owner,
    url: meta.image,
    title: meta.name,
    description: meta.description,
  };
};

export const getUserCollection = async (userId) => {
  const inventory = await MARKETPLACE_CONTRACT.getMyCollection({
    from: userId,
  });

  const items = await Promise.all(
    inventory.map(async (i) => {
      const tokenURI = await NFT_CONTRACT.tokenURI(i.tokenId);

      // Fetch nft data
      const meta = await fetch(tokenURI).then((res) => res.json());

      //converts price to ether
      const price = ethers.utils.formatUnits(i.price.toString(), "ether");

      return {
        id: i.tokenId.toNumber(),
        price,
        creator: i.seller,
        owner: i.owner,
        url: meta.image,
        title: meta.name,
        description: meta.description,
      };
    })
  );

  return items;
};
