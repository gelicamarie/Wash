import Head from "next/head";
import Image from "next/image";
import Navbar from "../../components/Navbar/Navbar";
import {
  Line,
  Container,
  Info,
  Section,
  Title,
  User,
  Menu,
  MenuItem,
  Description,
  Price,
  BuyBtn,
} from "./artwork.styled";
import blurImage from "../../../lib/blur-image";

const Item = ({ nft }) => {
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
            <User>Creator: {nft.creator}</User>
            <User>Owner: @{nft.owner} </User>
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
          <BuyBtn>BUY</BuyBtn>
        </Info>
      </Container>
    </>
  );
};

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/api/nfts/${context.query.id}`);
  const data = await res.json();
  if (data?.error) {
    return { notFound: true };
  }
  return { props: { nft: data.data } };
}

export default Item;
