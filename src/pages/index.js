import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import Art from "../components/Art/Art";
import Grid from "../components/Grid/Grid";
import styled from "styled-components";

import { getCollection } from "../lib/query";

const Home = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 80vh;
  margin: auto;
  align-items: center;
`;
const Header = styled.div`
  flex-direction: column;
`;
const Title = styled.h1`
  color: var(--color-theme-green-1);
  font-size: 5rem;
  margin-bottom: 0;
  line-height: 6rem;
`;

const SubHeader = styled.p`
  color: var(--color-theme-orange-1);
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 0;
`;

export default function Wash({ nfts }) {
  return (
    <div>
      <Head>
        <title>Wash</title>
        <meta name="description" content="An NFT Marketplace" />
        <link rel="icon" href="/wash.svg" />
      </Head>

      <main>
        <Navbar></Navbar>
        <Home>
          <Header>
            <Title>
              Explore & <br /> Trade Digital <br />
              Artwork.
            </Title>
            <SubHeader>Welcome to the world of NFT Art.</SubHeader>
          </Header>
          <Art
            title="Green Art"
            url="/1.png"
            owner="SaihajpreetSingh"
            price={2.75}
            to="/artwork/7"
            width={550}
            height={600}
          />
        </Home>
        <h1>Discover.</h1>
        <Grid data={nfts} />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const items = await getCollection();

  return {
    props: { nfts: items },
  };
}
