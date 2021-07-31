import Web3Modal from "web3modal";
import { ethers } from "ethers";
import styled from "styled-components";
import { MARKET_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS } from "../lib/config";
import MarketPlace from "../../artifacts/contracts/Marketplace.sol/Marketplace.json";

const BuyBtn = styled.button`
  font-size: 1.2rem;
  background-color: #606c38;
  color: var(--color-theme-bg);
  border: none;
  border-radius: 50px;
  padding: 1rem 4rem;
`;

const BuyButton = ({ nft }) => {
  async function buyNft() {
    const web3Modal = new Web3Modal(); // will look for the instance of the ethereum being injected to the web browser
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      MARKET_CONTRACT_ADDRESS,
      MarketPlace.abi,
      signer
    );

    // console.log(await provider.getTransactionCount(MARKET_CONTRACT_ADDRESS));

    const transaction = await contract.createMarketTransaction(
      NFT_CONTRACT_ADDRESS,
      nft.id,
      { value: ethers.utils.parseEther(nft.price) }
    );

    await transaction.wait();
  }

  return <BuyBtn onClick={() => buyNft()}>BUY</BuyBtn>;
};

export default BuyButton;
