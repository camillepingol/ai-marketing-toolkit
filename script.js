async function generate() {
  const input = document.getElementById("inputText").value;
  const chatBox = document.getElementById("chatBox");

  if (!input) return;

  chatBox.innerHTML += `<div class="message user">${input}</div>`;
  chatBox.innerHTML += `<div class="message bot" id="loading">🤖 Thinking...</div>`;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-base",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_NEW_TOKEN_HERE"
        },
        body: JSON.stringify({
          inputs: `
Act as a professional marketing expert.

Topic: ${input}

Return:
- SEO Title
- Facebook Caption
- Product Description
- Hashtags
          `
        })
      }
    );

    const data = await response.json();

    console.log(data);

    let output =
      data?.[0]?.generated_text ||
      data?.generated_text ||
      data?.error ||
      JSON.stringify(data);

    document.getElementById("loading").innerHTML = output;

  } catch (err) {
    document.getElementById("loading").innerHTML =
      "❌ Connection error";
  }

  document.getElementById("inputText").value = "";
}