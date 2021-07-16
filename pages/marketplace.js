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

export async function getServerSideProps(context) {
  const res = await fetch(`http://${context.req.headers.host}/api/nfts`);
  const data = await res.json();

  return {
    props: { nfts: data.data },
  };
}
