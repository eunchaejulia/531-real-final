const { InferenceClient } = require("huggingface-hub");

const client = new InferenceClient({
  token: process.env.HF_API_TOKEN,
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Invalid 'messages' format" });
      return;
    }

    const response = await client.chatCompletion({
      model: "HuggingFaceH4/zephyr-7b-beta",
      messages,
      temperature: 0.7,
      top_p: 0.95,
      max_tokens: 512,
    });

    res.status(200).json(response);
  } catch (error) {
    console.error("🔥 Error from HF API:", error);
    res.status(500).json({ error: error.message });
  }
};
