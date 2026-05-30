async function generate() {
  const input = document.getElementById("inputText").value;
  const chatBox = document.getElementById("chatBox");

  if (!input) return;

  chatBox.innerHTML += `<div class="message user">${input}</div>`;
  chatBox.innerHTML += `<div class="message bot">🤖 Thinking...</div>`;

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input })
    });

    const data = await response.json();

    chatBox.innerHTML += `<div class="message bot">${data.output || data.error}</div>`;

  } catch (err) {
    chatBox.innerHTML += `<div class="message bot">❌ Error connecting to server</div>`;
  }

  document.getElementById("inputText").value = "";
}