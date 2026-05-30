function generate() {
  const input = document.getElementById("inputText").value;
  const task = document.getElementById("task").value;
  const result = document.getElementById("result");

  if (!input) {
    result.innerHTML = "⚠️ Please enter a topic.";
    return;
  }

  let output = "";

  if (task === "blog") {
    output = `
📌 SEO Titles:
- ${input} Guide for Beginners
- Top Insights About ${input}
- Best Strategies for ${input}
`;
  }

  else if (task === "caption") {
    output = `
📣 Facebook Caption:
🔥 Discover everything about ${input}! Don’t miss out on the latest updates and offers!
`;
  }

  else if (task === "product") {
    output = `
🛍️ Product Description:
High-quality ${input} designed to deliver excellent performance and value for customers.
`;
  }

  else if (task === "hashtag") {
    output = `
#️⃣ Hashtags:
#${input.replace(/\s/g,'')} #Business #Marketing #Qatar #Success #Digital
`;
  }

  result.innerHTML = output;
}