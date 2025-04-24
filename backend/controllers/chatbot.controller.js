import axios from "axios";

export const chatWithBot = async (req, res) => {
    const { message } = req.body;
    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
            { inputs: message },
            { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
        );

        const botReply = response.data.generated_text || "Sorry, I didn't understand.";
        res.json({ reply: botReply });
    } catch (error) {
        console.error("Chatbot Error:", error);
        res.status(500).json({ reply: "Something went wrong!" });
    }
};
