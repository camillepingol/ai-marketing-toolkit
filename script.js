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

    console.log("RESPONSE:", data);

    if (data.output) {
      out.innerText = data.output;
    } else if (data.error) {
      out.innerText = "Error: " + data.error;
    } else {
      out.innerText = "No response from server.";
    }

  } catch (err) {
    console.error(err);
    out.innerText = "Error connecting to API: " + err.message;
  }
} function send() {
  const out = document.getElementById("out");

  out.innerText = "Button clicked";

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        input: "test"
      })
    });

    out.innerText = "Status: " + res.status;

    const text = await res.text();

    out.innerText += "\n\n" + text;

  } catch (err) {
    out.innerText = "FETCH ERROR:\n" + err.message;
  }
}