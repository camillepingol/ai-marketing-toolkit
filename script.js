async function generate() {
  const input = document.getElementById("inputText").value;
  const chatBox = document.getElementById("chatBox");

  if (!input) return;

  chatBox.innerHTML += `<div class="message user">${input}</div>`;
  chatBox.innerHTML += `<div class="message bot">🤖 Thinking...</div>`;

  const prompt = `
Act as a marketing assistant.

Create:
- SEO Title
- Facebook Caption
- Product Description
- Hashtags

Topic: ${input}
  `;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/google/flan-t5-base",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        // hf_bAWXHBkrpslFVWCMwoLZrnHSJIPAKeHuc
        "Authorization": "Bearer hf_YOUR_NEW_TOKEN_HERE"
      },
      body: JSON.stringify({
        inputs: prompt
      })
    }
  );

  const data = await response.json();

  const output =
    data[0]?.generated_text ||
    "No response from AI";

  const botMessages = document.querySelectorAll(".bot");
  botMessages[botMessages.length - 1].innerHTML = output;

  document.getElementById("inputText").value = "";
}