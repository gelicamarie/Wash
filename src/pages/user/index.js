import styled from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import Grid from "../../components/Grid/Grid";

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

export default function User({ nfts }) {
  console.log({ nfts });
  return (
    <>
      <Navbar></Navbar>
      <Hero>
        <Username>@0x000000</Username>
        <Container>
          <Button>Collection</Button>
          <Button>Creation</Button>
        </Container>
      </Hero>
      <Grid data={nfts}></Grid>
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://${context.req.headers.host}/api/nfts`);
  const data = await res.json();

  return {
    props: { nfts: data.data },
  };
}
