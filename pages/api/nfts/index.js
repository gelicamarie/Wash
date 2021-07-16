import { ARTWORKS } from "../../../components/Grid/nfts";

export default function handler(req, res) {
  res.status(200).json({ data: ARTWORKS });
}
