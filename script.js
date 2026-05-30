function generate() {
  const input = document.getElementById("inputText").value;
  const chatBox = document.getElementById("chatBox");

  if (!input) return;

  chatBox.innerHTML += `<div class="message user">${input}</div>`;

  const topic = input.toLowerCase();

  const seoTitles = [
    `Best ${input} Strategy for 2026`,
    `How to Grow Your ${input} Business Fast`,
    `Top ${input} Marketing Tips You Need`,
    `${input} Guide for Beginners in 2026`
  ];

  const captions = [
    `🔥 Learn how to improve your ${input} business today!`,
    `🚀 Boost your ${input} results with smart marketing!`,
    `💡 Discover powerful strategies for ${input}!`,
    `📈 Grow your ${input} faster with proven tips!`
  ];

  const descriptions = [
    `High-quality ${input} marketing strategy designed to increase growth and engagement.`,
    `Professional guide for improving your ${input} business performance and visibility.`,
    `Complete system to help you scale your ${input} effectively in 2026.`
  ];

  const hashtags = [
    `#${input.replace(/\s/g,"")} #Marketing #Business #Growth`,
    `#${input.replace(/\s/g,"")} #AI #DigitalMarketing #Success`,
    `#${input.replace(/\s/g,"")} #Strategy #Branding #OnlineBusiness`
  ];

  function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const output = `
📌 SEO Title:
${random(seoTitles)}

📣 Facebook Caption:
${random(captions)}

🛍️ Product Description:
${random(descriptions)}

#️⃣ Hashtags:
${random(hashtags)}
  `;

  chatBox.innerHTML += `<div class="message bot">${output}</div>`;
}