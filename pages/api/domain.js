// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ipLookup from "../../lib/ip_lookup";

export default async function handler(req, res) {
  let { domain } = req.query;

  let { address } = await ipLookup(domain);

  res.status(200).json({ domain, address });
}
