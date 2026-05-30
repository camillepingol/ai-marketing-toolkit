function generate() {
  const input = document.getElementById("inputText").value;
  const chatBox = document.getElementById("chatBox");

  if (!input) return;

  // USER MESSAGE
  chatBox.innerHTML += `
    <div class="message user">${input}</div>
  `;

  // AI SEARCH RESULT (structured like real job/search output)
  const response = `
🔎 SEARCH RESULT

We are hiring an AI Developer with expertise in ${input}.

The candidate should have experience in ${input}, AI APIs, automation tools, and workflow optimization.

Responsibilities include building AI-powered systems, integrations, and automation workflows.

Experience with OpenAI APIs, Zapier, Make, or n8n is highly preferred.

📩 Interested candidates can send CV and portfolio to:
+974 33865999
  `;

  chatBox.innerHTML += `
    <div class="message bot">${response}</div>
  `;

  document.getElementById("inputText").value = "";

  chatBox.scrollTop = chatBox.scrollHeight;
}

// ENTER SUPPORT
document.getElementById("inputText").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    generate();
  }
});