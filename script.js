async function generate() {
  const input = document.getElementById("inputText").value;
  const chatBox = document.getElementById("chatBox");

  if (!input) return;

  chatBox.innerHTML += `<div>User: ${input}</div>`;
  chatBox.innerHTML += `<div>AI thinking...</div>`;

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input })
    });

    const data = await res.json();

    chatBox.innerHTML += `<div>AI: ${data.output || data.error}</div>`;
  } catch (err) {
    chatBox.innerHTML += `<div>Error connecting to API</div>`;
  }
}