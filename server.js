const express = require('express');
const bodyParser = require('body-parser');

const app = express();
require('dotenv').config()

const port = 3000;

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// ...

app.use(bodyParser.json());
app.use(express.static('public'));


async function callGeminiAPI(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to fetch response from Gemini API');
  }
}

app.post('/suggest', async (req, res) => {
  const { code } = req.body;
  try {
    const suggestion = await callGeminiAPI(`Suggest the next lines of code:\n\n${code}`);
    res.json({ suggestion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/debug', async (req, res) => {
  const { code } = req.body;
  try {
    const debug = await callGeminiAPI(`Debug the following code and provide a solution:\n\n${code}`);
    res.json({ debug });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/tips', async (req, res) => {
  const { code } = req.body;
  try {
    const tips = await callGeminiAPI(`Provide tips to improve the following code:\n\n${code}`);
    res.json({ tips });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`AI Coding Helper app listening at http://localhost:${port}`);
});
