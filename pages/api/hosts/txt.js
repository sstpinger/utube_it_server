// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import "../../../lib/mongoose_connection";
import HostModel from "../../../lib/models/host.model";
import ipLookup from "../../../lib/ip_lookup";

export default async function handler(req, res) {
  const hosts = await HostModel.find();

  const txt = hosts.map((e) => `${e.ip} ${e.hostname}`).join("\n");

  res.status(200).send(txt);
}
