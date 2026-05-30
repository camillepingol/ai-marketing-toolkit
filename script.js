async function generate() {
  const input = document.getElementById("inputText").value;
  const chatBox = document.getElementById("chatBox");

  if (!input) return;

  chatBox.innerHTML += `<div class="message user">${input}</div>`;
  chatBox.innerHTML += `<div class="message bot">🤖 Thinking...</div>`;

  const prompt = `Marketing assistant: ${input}`;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer hf_YOUR_TOKEN_HERE"
        },
        body: JSON.stringify({
          inputs: prompt
        })
      }
    );

    const data = await response.json();

    console.log(data); // 🔥 important para makita mo error

    let output = "";

    if (data.error) {
      output = "⚠️ API Error: " + data.error;
    } else if (data.generated_text) {
      output = data.generated_text;
    } else if (data[0]?.generated_text) {
      output = data[0].generated_text;
    } else {
      output = JSON.stringify(data);
    }

    const botMessages = document.querySelectorAll(".bot");
    botMessages[botMessages.length - 1].innerHTML = output;

  } catch (err) {
    const botMessages = document.querySelectorAll(".bot");
    botMessages[botMessages.length - 1].innerHTML =
      "⚠️ Connection error (check API or token)";
  }

  document.getElementById("inputText").value = "";
}