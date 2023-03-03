import axios from "axios";

export default function handler(req, res) {
  let { text } = req.query;

  axios.post("http://chatopenai.sboomtools.net:81/api/completions", {
    max_tokens: 0,
    model: "text-davinci-003",
    prompt: text,
    signature:
      "85959697b88765732e7c044d52afb96ed9b3c8abe0feb566f6d8efdcf7f8f09f",
    timestamp: new Date().getTime(),
  });
}
