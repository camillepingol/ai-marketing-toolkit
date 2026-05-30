async function send() {
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