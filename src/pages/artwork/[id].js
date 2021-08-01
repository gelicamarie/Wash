import dynamic from "next/dynamic";
import Image from "next/image";
import Navbar from "../../components/Navbar/Navbar";
import blurImage from "../../lib/blur-image";
import styled from "styled-components";
import { getArtwork } from "../../lib/query";
import useMetaState from "../../lib/use-metastate";
const BuyButton = dynamic(() => import("../../components/BuyButton"), {
  ssr: false,
});

const SellButton = dynamic(() => import("../../components/SellButton"), {
  ssr: false,
});

const Line = styled.hr`
  margin: 0 0 1rem;
  border-top: 0.18rem solid black;
`;
const Container = styled.div`
  display: flex;
  height: 80vh;
  align-items: center;
  margin: 0;
`;

const Info = styled.div`
  width: 43%;
  margin: 0 3rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Title = styled.h1`
  margin: 0 0 0.5rem;
`;
const User = styled.h3`
  color: var(--color-theme-orange-1);
  font-weight: 500;
  margin: 0;
  font-size: 1.1rem;
`;
const Menu = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 1rem 0 0.2rem;
  padding: 0;
  width: 100%;
`;

const MenuItem = styled.li`
  margin: 0.5rem 0 0;
  font-weight: 500;
  font-size: 1.1rem;
`;

const Description = styled.div`
  height: 12rem;
  font-size: 1.15rem;
`;

const Price = styled.h3`
  margin: 4rem 0 0 0.8rem;
  letter-spacing: 0.2rem;
  font-size: 1.3rem;
`;

const Item = ({ nft }) => {
  const { account } = useMetaState();
  const Btn = () => {
    // if user is not logged in they can't buy
    if (!account) return "Connect your wallet to buy";

    // If you are the owner you sell
    if (account && account.toLowerCase() === nft.owner.toLowerCase()) {
      return <SellButton nft={nft} />;
    }
    // Freshly minted NFT up for sale
    if (nft.owner === "0x0000000000000000000000000000000000000000") {
      return <BuyButton nft={nft} />;
    }

    return null;
  };
  return (
    <>
      <Navbar></Navbar>
      <Container>
        <Image
          src={nft.url}
          alt={nft.title}
          width={570}
          height={620}
          quality={100}
          layout="fixed"
          placeholder="blur"
          blurDataURL={blurImage(500, 570)}
        />
        <Info>
          <Title>{nft.title}</Title>
          <Section>
            <User>Creator: {nft.creator.slice(0, 10)}</User>
            <User>Owner: @{nft.owner.slice(0, 10)}</User>
          </Section>
          <Section>
            <Menu>
              <MenuItem>Details</MenuItem>
            </Menu>
          </Section>
          <Line />
          <Description
            dangerouslySetInnerHTML={{ __html: nft.description }}
          ></Description>
          <Price>{nft.price} ETH</Price>
          <Btn />
        </Info>
      </Container>
    </>
  );
};

export async function getServerSideProps(context) {
  let item;
  try {
    item = await getArtwork(context.query.id);
  } catch (e) {
    return { notFound: true };
  }

  return { props: { nft: item } };
}

export default Item;
