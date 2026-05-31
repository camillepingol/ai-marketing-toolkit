async function send() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  const text = input.value.trim();
  if (!text) return;

  // USER MESSAGE
  chat.innerHTML += `<div class="msg user">${text}</div>`;
  input.value = "";

  // LOADING
  const loadingId = "loading";
  chat.innerHTML += `<div class="msg ai" id="${loadingId}">Thinking...</div>`;
  chat.scrollTop = chat.scrollHeight;

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input: text })
    });

    const data = await res.json();

    document.getElementById(loadingId).remove();

    chat.innerHTML += `<div class="msg ai">${data.output || data.error}</div>`;
    chat.scrollTop = chat.scrollHeight;

  } catch (err) {
    document.getElementById(loadingId).remove();
    chat.innerHTML += `<div class="msg ai">Error: ${err.message}</div>`;
  }
}