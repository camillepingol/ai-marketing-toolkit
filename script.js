async function send() {
  const input = document.getElementById("input").value;
  const out = document.getElementById("out");

  if (!input.trim()) {
    out.innerText = "Please type something...";
    return;
  }

  out.innerText = "Thinking... 🤖";

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input })
    });

    const data = await res.json();

    if (data.output) {
      out.innerText = data.output;
    } else {
      out.innerText = "Error: " + (data.error || "No response");
    }

  } catch (err) {
    out.innerText = "Error connecting to API: " + err.message;
  }
}