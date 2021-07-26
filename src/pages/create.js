import styled from "styled-components";
import Navbar from "../components/Navbar/Navbar";

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  margin: auto 4rem;
`;
const Header = styled.h1`
  margin: 3rem 0 0;
  font-size: 2.5rem;
  font-weight: 700;
`;
const Subheader = styled.h3`
  color: var(--color-theme-green-0);
  font-weight: 600;
  margin: 0.5rem 0;
`;
const Form = styled.div``;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const Label = styled.p`
  margin-bottom: 0.5rem;
  color: var(--color-theme-green-0);
  font-size: 1.1rem;
  font-weight: 500;
`;
const Input = styled.input`
  background: transparent;
  border: transparent;
  width: 45%;
  border-bottom: 2px solid var(--color-theme-green-2);
  color: var(--color-theme-green-0);
  margin: 0.3rem 0;
  padding: 1rem 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 500;
`;

const File = styled.input`
  background: transparent;
  border: transparent;
`;
const Description = styled.textarea`
  font-family: "Poppins", "Arial";
  background: transparent;
  color: var(--color-theme-green-2);
  border: 1.9px solid var(--color-theme-orange-0);
  height: 30%;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0;
  &:focus {
    outline: none !important;
    border-color: var(--color-theme-orange-0);
  }
`;

export const Button = styled.button`
  width: 15rem;
  font-size: 1.2rem;
  margin: 1rem 0;
  border-radius: 50px;
  border: 0.1rem solid black;
  padding: 0.8rem 2rem;
  background: var(--color-theme-green-0);
  color: var(--color-theme-bg);
  letter-spacing: 0.1rem;
  font-weight: 300;
`;

export default function Create() {
  return (
    <>
      <Navbar />
      <Hero>
        <Header>Create your collectible.</Header>
        <Subheader>
          Upload your digital creations and sell them as token on Wash!
        </Subheader>
        <Container>
          <Input placeholder="Name"></Input>
          <Input placeholder="Price"></Input>
        </Container>
        <Label>Description</Label>
        <Description placeholder="Description"></Description>
        <Button>Create NFT</Button>
      </Hero>
    </>
  );
}
