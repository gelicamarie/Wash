import { useContext, useEffect, useState } from "react";
import { useMetamask } from "use-metamask";
import styled from "styled-components";
import Web3 from "web3";
import Link from "next/link";
import { MetaMaskStateContext } from "../lib/use-metastate";
import { WEB3_PROVIDER } from "../lib/query";
const NavBtn = styled.button`
  font-family: Poppins, Arial;
  font-size: 0.95rem;
  margin: auto 1rem;
  border-radius: 50px;
  border: 0.1rem solid black;
  padding: 0.8rem 2rem;
  background: var(--color-theme-green-0);
  color: var(--color-theme-bg);
  font-weight: 400;
`;

const WalletButton = () => {
  const { connect, metaState } = useMetamask();
  const { setMetaState } = useContext(MetaMaskStateContext);
  const [loggedIn, setLoggedIn] = useState(false);

  const onClick = async () => {
    try {
      await connect(WEB3_PROVIDER);
      setLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setMetaState({
      account: metaState.account[0] && metaState.account[0],
      isConnected: metaState.isConnected,
    });
  }, [loggedIn]);

  return (
    <>
      {metaState.isConnected && (
        <NavBtn>
          <Link href="/create">Create NFT</Link>
        </NavBtn>
      )}
      {!metaState.isConnected && (
        <NavBtn onClick={onClick}>Connect Wallet</NavBtn>
      )}
    </>
  );
};

export default WalletButton;
