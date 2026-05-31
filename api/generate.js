export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { input } = req.body || {};

  if (!input) {
    return res.status(400).json({ error: "No input received" });
  }

  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Missing GROQ_API_KEY" });
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "You are a professional marketing expert. Create SEO Title, Facebook Caption, Product Description, and Hashtags."
            },
            {
              role: "user",
              content: input
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || "Groq API error",
        debug: data
      });
    }

    const output = data?.choices?.[0]?.message?.content;

    if (!output) {
      return res.status(500).json({
        error: "No response from AI",
        debug: data
      });
    }

    return res.status(200).json({ output });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}