// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import "../../../lib/mongoose_connection";
import HostModel from "../../../lib/models/host.model";

export default async function handler(req, res) {
  let time = Number(req.query.time || 0);
  time = new Date(time);

  const hosts = await HostModel.find({ createdAt: { $gte: time } });

  res.status(200).send({ hosts });
}
