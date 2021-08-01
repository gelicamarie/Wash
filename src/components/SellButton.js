import styled from "styled-components";

const SellBtn = styled.button`
  font-size: 1.2rem;
  background-color: #606c38;
  color: var(--color-theme-bg);
  border: none;
  border-radius: 50px;
  padding: 1rem 4rem;
  cursor: pointer;
`;

const SellButton = ({ nft }) => {
  async function sellNft() {
    // TODO
  }

  return <SellBtn onClick={() => sellNft()}>SELL</SellBtn>;
};

export default SellButton;
