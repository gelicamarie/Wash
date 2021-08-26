import styled from "styled-components";
import { SkynetClient } from "skynet-js";
import { useRouter } from "next/router";
import { useMetamask } from "use-metamask";
import { ethers } from "ethers";
import MarketPlace from "../../artifacts/contracts/Marketplace.sol/Marketplace.json";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import { MARKET_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS } from "../lib/config";
const Button = styled.button`
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

const client = new SkynetClient("https://siasky.net");

const CreateButton = ({ fileUrl, formInput }) => {
  const router = useRouter();
  const { metaState } = useMetamask();
  const createSale = async (url) => {
    const provider = new ethers.providers.Web3Provider(metaState.web3.provider);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT.abi, signer);

    let transaction = await contract.createNFT(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    const price = ethers.utils.parseUnits(formInput.price, "ether");

    contract = new ethers.Contract(
      MARKET_CONTRACT_ADDRESS,
      MarketPlace.abi,
      signer
    );

    let listPrice = await contract.getListingPrice();
    listPrice = listPrice.toString();

    transaction = await contract.createNewNFT(
      NFT_CONTRACT_ADDRESS,
      tokenId,
      price,
      { value: listPrice }
    );

    await transaction.wait();
    router.push("/");
  };

  const createMarket = async () => {
    const { name, price, description } = formInput;
    if (!name || !description || !price || !fileUrl) return;

    const data = JSON.stringify({
      image: fileUrl,
      name,
      description,
    });

    const file = new File([data], "data.json");
    console.log(file);
    try {
      const { skylink } = await client.uploadFile(file);
      const url = "https://siasky.net" + skylink.replace("sia://", "/");
      console.log(url);
      createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };
  return <Button onClick={createMarket}>Create NFT</Button>;
};

export default CreateButton;
