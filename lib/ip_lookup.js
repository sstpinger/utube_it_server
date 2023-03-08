const dns = require("dns");

export default function ipLookup(domain) {
  return new Promise((resolve, reject) => {
    dns.lookup(domain, (err, address, family) => {
      if (err) reject(err);
      resolve({ domain, address });
    });
  });
}
