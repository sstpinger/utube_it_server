// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import HostModel from "../../../lib/models/host.model";
import ipLookup from "../../../lib/ip_lookup";

export default async function handler(req, res) {
  let { domain } = req.body;

  let { address } = await ipLookup(domain);

  // let host = await HostModel.create({ hostname: domain, ip: address });

  res.status(200).json({ domain, address });
}
