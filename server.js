const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

// Serve the frontend HTML
app.use(express.static(path.join(__dirname, 'public')));

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
