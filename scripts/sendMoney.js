const hre = require("hardhat");

const SEND_MONEY = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

async function main() {
  const provider = new hre.ethers.providers.JsonRpcProvider();
  const signer = await provider.getSigner();
  const tx = await signer.sendTransaction({
    to: SEND_MONEY,
    value: hre.ethers.utils.parseUnits("10", "ether"),
  });
  console.log(tx);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
