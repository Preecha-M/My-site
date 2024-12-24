const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());

// Serve your HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Endpoint to handle text submission
app.post('/submit', (req, res) => {
  const { message } = req.body;

  if (message) {
    fs.appendFile('message.txt', message + '\n', (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to save the message.');
      } else {
        res.status(200).send('Message saved successfully!');
      }
    });
  } else {
    res.status(400).send('Message cannot be empty.');
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
