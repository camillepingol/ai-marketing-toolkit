async function generate() {
  const input = document.getElementById("inputText").value;
  const chatBox = document.getElementById("chatBox");

  if (!input) return;

  chatBox.innerHTML += `<div>👤 ${input}</div>`;
  chatBox.innerHTML += `<div>🤖 Thinking...</div>`;

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input })
    });

    const data = await res.json();

    console.log("API RESPONSE:", data); // important debug

    const reply = data.output || data.error || "No response";

    chatBox.innerHTML += `<div>🤖 ${reply}</div>`;

  } catch (err) {
    chatBox.innerHTML += `<div>❌ Error connecting to API</div>`;
    console.log(err);
  }

  document.getElementById("inputText").value = "";
}