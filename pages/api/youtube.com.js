import axios from "axios";

export default async function handler(req, res) {
  router.get("/", (req, res) => {
    let url = "https://youtube.com";
    axios({
      method: "get",
      url,
      responseType: "stream",
    }).then(function (response) {
      response.data.pipe(res);
    });
  });
}
