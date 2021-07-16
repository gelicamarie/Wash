import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import { Home, Header, Title, SubHeader } from "../styles/index.styles";
import Art from "../components/Art/Art";
import Grid from "../components/Grid/Grid";

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

export async function getServerSideProps(context) {
  const res = await fetch(`http://${context.req.headers.host}/api/nfts`);
  const data = await res.json();

  return {
    props: { nfts: data.data },
  };
}
