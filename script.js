function generate() {
  const input = document.getElementById("inputText").value;
  const chatBox = document.getElementById("chatBox");

  if (!input) return;

  chatBox.innerHTML += `<div class="message user">${input}</div>`;

  let topic = input.toLowerCase();

  let output = "";

  if (topic.includes("coffee")) {
    output = `
📌 SEO Title:
Best Coffee Shop Marketing Strategy 2026

📣 Facebook Caption:
🔥 Grow your coffee business with smart digital marketing!

🛍️ Product Description:
Professional coffee shop marketing system to attract more customers.

#️⃣ Hashtags:
#Coffee #Cafe #Marketing #Business #Growth
    `;
  }

  else if (topic.includes("hotel")) {
    output = `
📌 SEO Title:
Luxury Hotel Marketing Strategy 2026

📣 Facebook Caption:
🔥 Increase hotel bookings with smart branding!

🛍️ Product Description:
High-end marketing system designed for hotels.

#️⃣ Hashtags:
#Hotel #Luxury #Travel #Marketing
    `;
  }

  else if (topic.includes("food")) {
    output = `
📌 SEO Title:
Food Business Growth Strategy 2026

📣 Facebook Caption:
🔥 Boost your food business sales today!

🛍️ Product Description:
Complete marketing system for food businesses.

#️⃣ Hashtags:
#Food #Business #Marketing #Growth
    `;
  }

  else {
    output = `
📌 SEO Title:
Best ${input} Marketing Strategy 2026

📣 Facebook Caption:
🔥 Learn how to grow your ${input} business!

🛍️ Product Description:
Smart marketing solution for ${input}.

#️⃣ Hashtags:
#${input.replace(/\s/g,"")} #Marketing #Business
    `;
  }

  chatBox.innerHTML += `<div class="message bot">${output}</div>`;
}