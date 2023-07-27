import { getAll, EdgeConfigValue } from "@vercel/edge-config";

export default async function handler(req, res) {

  const item = await getAll();

  res.status(200).json(item);

  return item.user;
}



