let historyData = JSON.parse(localStorage.getItem("history")) || [];

async function send(promptOverride = null) {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  const text = (promptOverride || input.value).trim();

  if (!text) return;

  chat.innerHTML += `
    <div class="msg user">
      ${text}
    </div>
  `;

  input.value = "";

  const loadingId = "loading";

  chat.innerHTML += `
    <div class="msg ai" id="${loadingId}">
      Generating...
    </div>
  `;

  chat.scrollTop = chat.scrollHeight;

  try {

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        input: text
      })
    });

    const data = await res.json();

    const loading = document.getElementById(loadingId);

    if (loading) {
      loading.remove();
    }

    const id = "ai" + Date.now();

    const output = data.output || data.error || "No response";

    chat.innerHTML += `
      <div class="msg ai" id="${id}">
        <div class="copy" onclick="copyText('${id}')">
          Copy
        </div>
        ${output}
      </div>
    `;

    historyData.push({
      prompt: text,
      result: output,
      date: new Date().toLocaleString()
    });

    localStorage.setItem(
      "history",
      JSON.stringify(historyData)
    );

    chat.scrollTop = chat.scrollHeight;

  } catch (err) {

    const loading = document.getElementById(loadingId);

    if (loading) {
      loading.remove();
    }

    chat.innerHTML += `
      <div class="msg ai">
        Error: ${err.message}
      </div>
    `;
  }
}

function quick(type) {

  const input = document.getElementById("input");

  input.value = `Create ${type} for coffee business`;

  send();
}

function copyText(id) {

  const el = document.getElementById(id);

  const text = el.innerText
    .replace("Copy", "")
    .trim();

  navigator.clipboard.writeText(text);

  alert("Copied!");
}

function showHistory() {

  const chat = document.getElementById("chat");

  if (historyData.length === 0) {

    chat.innerHTML += `
      <div class="msg ai">
        No saved history.
      </div>
    `;

    return;
  }

  let html = `
    <div class="msg ai">
      <b>History</b><br><br>
  `;

  historyData
    .slice()
    .reverse()
    .forEach(item => {

      html += `
        <hr>
        <b>Prompt:</b><br>
        ${item.prompt}
        <br><br>

        <b>Generated:</b><br>
        ${item.result}
        <br><br>

        <small>${item.date}</small>
        <br>
      `;
    });

  html += `</div>`;

  chat.innerHTML += html;

  chat.scrollTop = chat.scrollHeight;
}

function clearHistory() {

  localStorage.removeItem("history");

  historyData = [];

  alert("History cleared");
}