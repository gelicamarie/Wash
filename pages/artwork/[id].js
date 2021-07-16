import Head from "next/head";
import Image from "next/image";
import Navbar from "../../components/Navbar/Navbar";
import blurImage from "../../lib/blur-image";
import styled from "styled-components";

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

const BuyBtn = styled.button`
  font-size: 1.2rem;
  background-color: #606c38;
  color: var(--color-theme-bg);
  border: none;
  border-radius: 50px;
  padding: 1rem 4rem;
`;

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
  const res = await fetch(
    `http://${context.req.headers.host}/api/nfts/${context.query.id}`
  );
  const data = await res.json();
  if (data?.error) {
    return { notFound: true };
  }
  return { props: { nft: data.data } };
}

export default Item;
