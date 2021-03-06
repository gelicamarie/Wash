import styled from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import Grid from "../../components/Grid/Grid";
import { useMetamask } from "use-metamask";
import useMetaState from "../../lib/use-metastate";
import { getUserCollection } from "../../lib/query";
import { useState, useEffect } from "react";

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Username = styled.h1`
  margin: 3rem auto;
  color: var(--color-theme-green-1);
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  width: 25rem;
  font-size: 1.3rem;
  padding: 0.5rem;
  border: transparent;
  border-bottom: 3px solid var(--color-theme-green-1);
  background: transparent;
  color: var(--color-theme-orange-0);
  letter-spacing: 0.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export default function User() {
  const { account, isConnected } = useMetaState();
  const [nfts, setNfts] = useState([]);

  useEffect(async () => {
    setNfts(await getUserCollection(account));
  }, [account]);

  if (!isConnected) {
    return (
      <>
        <Navbar></Navbar>
        <Hero>
          <h1>You must log in</h1>
        </Hero>
      </>
    );
  }

  return (
    <>
      <Navbar></Navbar>
      <Hero>
        <Username>{account.slice(0, 10)}</Username>
        <Container>
          <Button>Collection</Button>
          <Button>Creation</Button>
        </Container>
      </Hero>
      <Grid data={nfts}></Grid>
    </>
  );
}
