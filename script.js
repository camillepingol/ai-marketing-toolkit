async function generate() {
  const input = document.getElementById("inputText").value;
  const chatBox = document.getElementById("chatBox");

  if (!input) return;

  chatBox.innerHTML += `<div class="message user">${input}</div>`;
  chatBox.innerHTML += `<div class="message bot" id="loading">🤖 Thinking...</div>`;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          // 🔑 ILAGAY MO TOKEN MO DITO
          "Authorization": "Bearer hf_YOUR_TOKEN_HERE"
        },
        body: JSON.stringify({
          inputs: `Act as a marketing assistant. Create SEO title, Facebook caption, product description, and hashtags for: ${input}`
        })
      }
    );

    const data = await response.json();

    console.log("API RESPONSE:", data);

    let output = "";

    if (data.error) {
      output = "❌ API Error: " + data.error;
    } 
    else if (Array.isArray(data) && data[0]?.generated_text) {
      output = data[0].generated_text;
    } 
    else if (data.generated_text) {
      output = data.generated_text;
    } 
    else {
      output = JSON.stringify(data);
    }

    document.getElementById("loading").innerHTML = output;

  } catch (err) {
    console.log(err);
    document.getElementById("loading").innerHTML =
      "❌ Connection failed. Check internet or token.";
  }

  document.getElementById("inputText").value = "";
}