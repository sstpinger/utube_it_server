export default function (text) {
  var hosts = [];

  const get_ips = (s) =>
    s.match(
      /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g
    );

  const rows = text.split("↓");

  for (let row of rows) {
    let ips = get_ips(row);

    if (
      !(
        ips &&
        ips.length &&
        !row.toLowerCase().includes("giamping") &&
        row.toLowerCase().includes("opengw.net")
      )
    ) {
      continue;
    }

    const ip = ips[0];
    const ip_i = row.indexOf(ip);

    let first_digit = false;
    let port = "";

    if (!row.includes(":")) {
      port = "443";
    } else {
      for (let i = ip_i - 1; i >= 0; i--) {
        let c = row[i];
        if (c >= "0" && c <= "9") {
          first_digit = true;
          port = c + port;
        } else if (first_digit) {
          break;
        }
      }
    }

    hosts.push({ ip, port });
  }

  return hosts;
}

export class SstpLocation {
  country = "";
  short = "";
  name = "";

  static fromObj({ country = "", short = "", name = "" }) {
    const a = new SstpLocation();

    a.country = country;
    a.short = short;
    a.name = name;

    return a;
  }
}

export class Sstp {
  hostname = "";
  ip = "";
  port = 443;
  info = "";
  info2 = "";
  location = new SstpLocation();
  createdAt = new Date();

  get key() {
    return `${this.ip}:${this.port}`;
  }

  static fromObj({ hostname, ip, port, info, info2, location, createdAt }) {
    const a = new Sstp();
    a.hostname = hostname;
    a.ip = ip;
    a.port = port;
    a.info = info;
    a.info2 = info2;
    if (location) a.location = SstpLocation.fromObj(location);
    if (createdAt) a.createdAt = new Date(createdAt);

    return a;
  }

  static fromRawJson(json) {
    return Sstp.fromObj(JSON.parse(json));
  }

  static fromRaw(s) {
    //  0465812
    // 4 SESSIONS 3 HOURS TOTAL 1,953 USERS
    // ASIA 93.92
    // VPN442637977.OPENGW.NET:1699
    // KR - SOUTH KOREA ~ DLIVE
    // 124.5.96.197
    let a = s.split("•");
    let [hostname, port] = [...a[3].split(":"), "443"];
    let [short, country, name] = a[4].split(/[-~]+/);

    const sstp = new Sstp();

    sstp.id = a[0].trim();

    sstp.hostname = hostname.trim();
    sstp.ip = a[5].trim();
    sstp.port = parseInt(port.trim());

    sstp.info = a[1].trim();
    sstp.info2 = a[2].trim();

    sstp.location = SstpLocation.fromObj({
      country: country.trim(),
      short: short.trim(),
      name: name.trim(),
    });

    return sstp;
  }
}

export const toJson = (text) => {
  let arr = text.split("↑");

  text = arr.find((e) => e.includes("OPENGW.NET"));

  return text
    .trim()
    .split("↓")
    .map((e) => e.trim())
    .filter((e) => e)
    .map((e) => Sstp.fromRaw(e));
};
