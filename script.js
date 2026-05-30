function generate() {
  const input = document.getElementById("inputText").value;
  const chatBox = document.getElementById("chatBox");

  if (!input) return;

  // USER MESSAGE
  chatBox.innerHTML += `
    <div class="message user">${input}</div>
  `;

  // AI RESPONSE (structured marketing output)
  const response = `
📌 SEO Title:
Best ${input} Guide for 2026

📣 Facebook Caption:
🔥 Learn everything about ${input} and grow your business today!

🛍️ Product Description:
High-quality ${input} designed for performance and value.

#️⃣ Hashtags:
#${input.replace(/\s/g,'')} #Marketing #Business #AI #Growth
  `;

  chatBox.innerHTML += `
    <div class="message bot">${response}</div>
  `;

  document.getElementById("inputText").value = "";

  chatBox.scrollTop = chatBox.scrollHeight;
}