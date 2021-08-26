import styled from "styled-components";
import Navbar from "../components/Navbar/Navbar";
import Upload from "../components/Upload";
import useMetaState from "../lib/use-metastate";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { SkynetClient } from "skynet-js";
import { ethers } from "ethers";

import { useMetamask } from "use-metamask";

const client = new SkynetClient("https://siasky.net");

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
  outline: none;
`;

const FileInput = styled.input`
  font-family: "Poppins", "Arial";
  margin-top: 0.8rem;
`;

const Description = styled.textarea`
  font-family: "Poppins", "Arial";
  background: transparent;
  color: var(--color-theme-green-2);
  border: 1.9px solid var(--color-theme-orange-0);
  height: 20%;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0;
  &:focus {
    outline: none !important;
    border-color: var(--color-theme-orange-0);
  }
`;

const Photo = styled(Upload)`
  margin: 0;
  padding: 0;
  width: 25rem;
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

const CreateButton = dynamic(() => import("../components/CreateButton"), {
  ssr: false,
});
export default function Create() {
  const { isConnected } = useMetaState();

  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateInput] = useState({
    name: "",
    price: "",
    description: "",
  });

  if (!isConnected) {
    return (
      <>
        <Navbar></Navbar>
        <Hero>
          <h1>You must log in</h1>
        </Hero>
      </>
    );
  }

  const onChange = async (e) => {
    const file = e.target.files[0];

    const { skylink } = await client.uploadFile(file);
    console.log(skylink);
    console.log(`Upload successful, url: ${skylink}`);
    const url = "https://siasky.net/" + skylink.replace("sia:", "") + "/";
    setFileUrl(url);
    console.log(fileUrl);
  };

  return (
    <>
      <Navbar />
      <Hero>
        <Header>Create your collectible.</Header>
        <Subheader>
          Upload your digital creations and sell them as token on Wash!
        </Subheader>
        {fileUrl ? (
          <Image
            alt="asset"
            className="rounded mt-4"
            width={350}
            height={250}
            layout="fixed"
            src={fileUrl}
            loader={({ src }) => `${src}`}
          />
        ) : (
          <Photo />
        )}

        <FileInput
          type="file"
          name="NFT"
          accept="image/*, .jpg"
          onChange={onChange}
        ></FileInput>
        <Container>
          <Input
            placeholder="Name"
            onChange={(e) =>
              updateInput({ ...formInput, name: e.target.value })
            }
          ></Input>
          <Input
            placeholder="Price"
            onChange={(e) =>
              updateInput({ ...formInput, price: e.target.value })
            }
          ></Input>
        </Container>
        <Label>Description</Label>
        <Description
          placeholder="Description"
          onChange={(e) =>
            updateInput({ ...formInput, description: e.target.value })
          }
        ></Description>
        <CreateButton fileUrl={fileUrl} formInput={formInput} />
      </Hero>
    </>
  );
}
