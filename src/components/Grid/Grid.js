import Image from "next/image";
import { Container } from "./Grid.styled";
import Art from "../Art/Art";

const Grid = ({ data }) => {
  return (
    <Container>
      {data.map(({ id, title, url, owner, price, to }) => (
        <Art
          key={id}
          title={title}
          url={url}
          owner={owner}
          price={price}
          to={`/artwork/${id}`}
          width={300}
          height={400}
        />
      ))}
    </Container>
  );
};

export default Grid;
