async function send() {
  const input = document.getElementById("input").value;
  const out = document.getElementById("out");

  if (!input.trim()) {
    out.innerText = "Please enter a prompt.";
    return;
  }

  out.innerText = "Thinking...";

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input })
    });

    const text = await res.text();

    console.log("STATUS:", res.status);
    console.log("RESPONSE:", text);

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      out.innerText = text;
      return;
    }

    if (data.output) {
      out.innerText = data.output;
    } else if (data.error) {
      out.innerText = `Error: ${data.error}`;
    } else {
      out.innerText = "No response received.";
    }

  } catch (err) {
    console.error(err);
    out.innerText = `Error connecting to API: ${err.message}`;
  }
}