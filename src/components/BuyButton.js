import styled from "styled-components";
import { MARKET_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS } from "../lib/config";
import MarketPlace from "../../artifacts/contracts/Marketplace.sol/Marketplace.json";
import { useMetamask } from "use-metamask";
import { ethers } from "ethers";

const BuyBtn = styled.button`
  font-size: 1.2rem;
  background-color: #606c38;
  color: var(--color-theme-bg);
  border: none;
  border-radius: 50px;
  padding: 1rem 4rem;
  cursor: pointer;
`;

const BuyButton = ({ nft }) => {
  const { metaState } = useMetamask();
  async function buyNft() {
    const provider = new ethers.providers.Web3Provider(metaState.web3.provider);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      MARKET_CONTRACT_ADDRESS,
      MarketPlace.abi,
      signer
    );

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
