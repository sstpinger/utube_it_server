import axios from "axios";

export default async function handler(req, res) {
  router.get("/", (req, res) => {
    axios({
      method: "get",
      url: apiUrl,
      responseType: "stream",
    }).then(function (response) {
      response.data.pipe(res);
    });
  });
}
