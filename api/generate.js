export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { input, mode } = req.body || {};

  if (!input) {
    return res.status(400).json({ error: "No input received" });
  }

  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Missing GROQ_API_KEY" });
    }

    let systemPrompt = `
You are a professional marketing expert.
Return structured marketing content.
`;

    if (mode === "seo") {
      systemPrompt = `
Return strictly:

SEO Title:
Facebook Caption:
Product Description:
Hashtags:
`;
    }

    if (mode === "ads") {
      systemPrompt = `
Return strictly:

Ad Headline:
Primary Text:
Call To Action:
Hashtags:
`;
    }

    if (mode === "product") {
      systemPrompt = `
Return strictly:

Product Name:
Description:
Benefits:
Hashtags:
`;
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: input
            }
          ],
          temperature: 0.7
        })
      }
    );

    const data = await response.json();

    const output = data?.choices?.[0]?.message?.content;

    if (!output) {
      return res.status(500).json({
        error: data?.error?.message || "No response from AI"
      });
    }

    return res.status(200).json({ output });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}