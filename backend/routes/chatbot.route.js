import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const userMessage = req.body.message;  // Get user input
    console.log("User message:", userMessage);

    const hfApiKey = process.env.HF_API_KEY;
    const apiUrl = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";

    // Send request to Hugging Face
    const response = await axios.post(
      apiUrl,
      { inputs: userMessage },
      {
        headers: {
          Authorization: `Bearer ${hfApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Hugging Face Response:", response.data);

    if (!response.data || !response.data[0] || !response.data[0].generated_text) {
      return res.status(500).json({ message: "Error processing chatbot response" });
    }

    // Send back the chatbot's response
    res.json({ reply: response.data[0].generated_text });

  } catch (error) {
    console.error("Chatbot API Error:", error.message);
    res.status(500).json({ message: "Error! Try again" });
  }
});

export default router;
