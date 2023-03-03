// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const dns = require('dns');

export default function handler(req, res) {
  let { domain } = req.query;
  
  dns.lookup(domain, (err, address, family) => {
    if(err) res.status(500).json({ error: "error" });
    
    res.status(200).json({ domain, address });
  });

}
