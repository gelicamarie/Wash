import Navbar from "../components/Navbar/Navbar";
import Grid from "../components/Grid/Grid";

export default function Marketplace({ nfts }) {
  return (
    <>
      <Navbar></Navbar>
      <Grid data={nfts}></Grid>;
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/nfts");
  const data = await res.json();

  return {
    props: { nfts: data.data },
  };
}
