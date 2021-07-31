import Navbar from "../components/Navbar/Navbar";
import Grid from "../components/Grid/Grid";
import { getCollection } from "../lib/query";

export default function Marketplace({ nfts }) {
  return (
    <>
      <Navbar></Navbar>
      <Grid data={nfts}></Grid>
    </>
  );
}

export async function getServerSideProps() {
  const items = await getCollection();

  return {
    props: { nfts: items },
  };
}
