import axios from "axios";

export default async function handler(req, res) {
  router.get("/", async (req, res) => {
    let apiUrl = "https://youtube.com";

    console.log(apiUrl);
    const scratchResponse = await axios.get(apiUrl);
    try {
      res.send(scratchResponse);
      console.log("worked!", apiUrl);
    } catch (error) {
      console.log("error in assets get request", apiUrl, error);
      res.sendStatus(500);
    }
  });
}
