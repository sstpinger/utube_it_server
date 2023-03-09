import axios from "axios";

export default async function handler(req, res) {
  let { page, limit } = req.query;

  let sort_type = "desc";
  let sort_by = "lastChecked";

  const { data } = await axios.get(
    "https://proxylist.geonode.com/api/proxy-list",
    {
      params: {
        page,
        limit,
        sort_type,
        sort_by,
      },
    }
  );

  res.status(200).json(data);
}
