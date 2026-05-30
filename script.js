function generateContent() {

let topic = document.getElementById("topic").value;

let result = `
<h2>Generated Content</h2>

<h3>SEO Title</h3>
<p>Best ${topic} in Qatar</p>

<h3>Facebook Caption</h3>
<p>Looking for quality ${topic}? Check out our latest offers today!</p>

<h3>Product Description</h3>
<p>Premium ${topic} designed to provide excellent value and customer satisfaction.</p>

<h3>Hashtags</h3>
<p>#${topic.replace(/\s+/g,'')} #QatarBusiness #Marketing #Sales</p>
`;

document.getElementById("result").innerHTML = result;

}