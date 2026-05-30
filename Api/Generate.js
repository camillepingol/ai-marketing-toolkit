export default async function handler(req, res) {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: "No input received" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Act as a marketing expert. Create SEO title, Facebook caption, product description, hashtags for: ${input}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("GEMINI RESPONSE:", data);

    const output =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!output) {
      return res.status(500).json({ error: "No AI output returned" });
    }

    res.status(200).json({ output });

  } catch (err) {
    res.status(500).json({ error: "API failed", details: err.message });
  }
}