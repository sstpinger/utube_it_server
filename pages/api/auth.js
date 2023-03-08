// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { githubDispatch } from "@/lib/github_dispatcher";
import { canAuth } from "../../lib/middleware/auth";

export default async function handler(req, res) {
  try {
    await canAuth({
      key: req.query.key,
      deviceId: req.query.deviceId,
    });

    // githubDispatch();

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}
