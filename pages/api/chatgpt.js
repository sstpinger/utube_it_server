import axios from "axios";

export default async function handler(req, res) {
  let { text } = req.query;

  const { data } = await axios.post(
    "http://chatopenai.sboomtools.net:81/api/completions",
    {
      max_tokens: 0,
      model: "text-davinci-003",
      prompt: text,
      signature:
        "ab17177ce626a4348dcfa6c7861373465674668620c46761a8b3ee246d7bc70d",
      timestamp: 1677864958,
    }
  );

  res.status(200).json(data);
}
