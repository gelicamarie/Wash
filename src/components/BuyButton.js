import Web3 from "web3";
import styled from "styled-components";
import { MARKET_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS } from "../lib/config";
import MarketPlace from "../../artifacts/contracts/Marketplace.sol/Marketplace.json";
import { useMetamask } from "use-metamask";

const BuyBtn = styled.button`
  font-size: 1.2rem;
  background-color: #606c38;
  color: var(--color-theme-bg);
  border: none;
  border-radius: 50px;
  padding: 1rem 4rem;
`;

const BuyButton = ({ nft }) => {
  const { metaState } = useMetamask();
  async function buyNft() {
    const ethers = metaState.web3.eth;

    const contract = new ethers.Contract(
      MarketPlace.abi,
      MARKET_CONTRACT_ADDRESS
    );

    const transaction = await contract.methods
      .createMarketTransaction(NFT_CONTRACT_ADDRESS, nft.id)
      .send({ from: metaState.account[0] });

    await transaction.wait();
  }

  return <BuyBtn onClick={() => buyNft()}>BUY</BuyBtn>;
};

export default BuyButton;
