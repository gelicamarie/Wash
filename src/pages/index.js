import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import Art from "../components/Art/Art";
import Grid from "../components/Grid/Grid";
import styled from "styled-components";

import { nftAddress, nftMarketAddress } from "./config.js";
//how ether clients interact with the contracts
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import MarketPlace from "../../artifacts/contracts/Marketplace.sol/Marketplace.json";

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

export default function Wash() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider();
    const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
    const marketPlaceContract = new ethers.Contract(
      nftMarketAddress,
      MarketPlace.abi,
      provider
    );

    const inventory = await marketPlaceContract.getCollection();
    const items = await Promise.all(
      inventory.map(async (i) => {
        const tokenURI = await tokenContract.tokenURI(i.tokenId);
        const meta = fetch(tokenURI);
        //const meta = await (fetch the data correlated to the tokenURI)

        //converts price to ether
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };

        return item;
      })
    );

    setNfts(items);
    setLoadingState("loaded");
  }

  async function buyNft(nft) {
    const web3Modal = new Web3Modal(); //will look for the instance of the ethereum being injected to the web browser
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      nftMarketAddress,
      MarketPlace.abi,
      signer
    );

    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

    const transaction = await contract.createMarketSale(
      nftAddress,
      nft.tokenId,
      {
        value: price,
      }
    );

    await transaction.wait();
    loadNFTs();
  }
  // if (loadingState === "loaded" && !nfts.length)
  //   return <h1 className>Ooops, seems like the Marketplace is empty</h1>;

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
        {/* <Grid data={nfts} /> */}
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
