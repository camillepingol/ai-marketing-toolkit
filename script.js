async function send() {
  const input = document.getElementById("input").value;
  const out = document.getElementById("out");

  if (!input) {
    out.innerText = "Please type something...";
    return;
  }

  out.innerText = "Thinking...";

  try {
    const res = await fetch("/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input })
    });

    const data = await res.json();

    out.innerText = data.output || data.error || "No response";

  } catch (err) {
    console.log(err);
    out.innerText = "Error connecting to API";
  }
}