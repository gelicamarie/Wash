import { ARTWORKS } from "../../../components/Grid/nfts";

export default function handler(req, res) {
  const artwork = ARTWORKS.find(({ id }) => id === req.query.id);

  if (!artwork) return res.status(404).json({ error: "Not Found" });

  return res.status(200).json({
    name: artwork.title,
    description: artwork.description,
    image: artwork.url,
  });
}
