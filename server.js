const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));


const client = new OpenAI({
    apiKey: 'sk-None-dX3GWRuP2BZyIDLoyHk5T3BlbkFJx3CikQlB2cDmr5lGVmW4', // This is the default and can be omitted
  });

app.post('/suggest', async (req, res) => {
  const { code } = req.body;
  try {
    const response = await client.chat.completions.create({
      model: 'text-davinci-003',
      messages: [{ role: 'user', content:`Suggest the next lines of code:\n\n${code}` }],
      max_tokens: 100,
    });
    res.json({ suggestion: response.data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/debug', async (req, res) => {
  const { code } = req.body;
  try {
    const response = await client.chat.completions.create({
        model: 'text-davinci-003',
        messages: [{ role: 'user', content:`Suggest the next lines of code:\n\n${code}` }],
        max_tokens: 100,
      });
    res.json({ debug: response.data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/tips', async (req, res) => {
  const { code } = req.body;
  try {
    const response = await client.chat.completions.create({
        model: 'text-davinci-003',
        messages: [{ role: 'user', content:`Suggest the next lines of code:\n\n${code}` }],
        max_tokens: 100,
      });
    res.json({ tips: response.data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`AI Coding Helper app listening at http://localhost:${port}`);
});
