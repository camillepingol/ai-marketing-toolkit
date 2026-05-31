async function send(promptOverride = null) {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  const text = (promptOverride || input.value).trim();
  if (!text) return;

  chat.innerHTML += `<div class="msg user">${text}</div>`;
  input.value = "";

  const loadingId = "loading";
  chat.innerHTML += `<div class="msg ai" id="${loadingId}">Generating...</div>`;
  chat.scrollTop = chat.scrollHeight;

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: text })
    });

    const data = await res.json();

    document.getElementById(loadingId).remove();

    const id = "ai" + Date.now();

    chat.innerHTML += `
      <div class="msg ai" id="${id}">
        <div class="copy" onclick="copyText('${id}')">copy</div>
        ${data.output || data.error}
      </div>
    `;

    chat.scrollTop = chat.scrollHeight;

  } catch (err) {
    document.getElementById(loadingId).remove();
    chat.innerHTML += `<div class="msg ai">Error: ${err.message}</div>`;
  }
}

// quick prompts
function quick(type) {
  const input = document.getElementById("input");
  input.value = `Create ${type} for coffee business`;
  send();
}

// copy function
function copyText(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text.replace("copy", ""));
  alert("Copied!");
}