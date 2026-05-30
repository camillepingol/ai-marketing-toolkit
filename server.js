import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("AI Backend is running 🚀");
});

// main AI route
app.post("/generate", async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.json({ error: "No input provided" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
Act as a professional marketing expert.

Topic: ${input}

Generate:
- SEO Title
- Facebook Caption
- Product Description
- Hashtags
                  `
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("Gemini response:", data);

    const output =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!output) {
      return res.json({ error: "No AI response" });
    }

    res.json({ output });

  } catch (error) {
    console.log(error);
    res.json({ error: "Server error or API failed" });
  }
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});