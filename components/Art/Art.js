import Link from "next/link";
import Image from "next/image";
import { Container, Artwork, ArtInfo, Title, Price, Owner } from "./Art.styled";
import blurImage from "../../lib/blur-image";

const Art = ({ title, url, owner, price, width, height, to }) => {
  return (
    <Link href={to}>
      <Artwork>
        <Image
          src={url}
          alt={title}
          width={width}
          height={height}
          placeholder="blur"
          blurDataURL={blurImage(width, height)}
        />
        <ArtInfo>
          <Container>
            <Title>{title}</Title>
            <Price>{price} ETH</Price>
          </Container>
          <Owner>@{owner}</Owner>
        </ArtInfo>
      </Artwork>
    </Link>
  );
};

export default Art;
