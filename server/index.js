const express = require("express");
require("dotenv").config();
import OpenAI from "openai";

const openai = new OpenAI({
  organization: "org-BPF7WR3IuMdcYQoSJHxwLbGX",
  project: "proj_zYytq4DDro6M6StaryVwR01T",
});

const app = express();

app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  const { input } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Say this is a test" }],
    });

    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
