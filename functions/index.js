/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore(); // Firestore database reference

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint to handle text submission
app.post('/submit', async (req, res) => {
  const { message } = req.body;

  if (message) {
    try {
      // Save the message to Firestore
      await db.collection('messages').add({ message, timestamp: admin.firestore.FieldValue.serverTimestamp() });
      res.status(200).send('Message saved successfully!');
    } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).send('Failed to save the message.');
    }
  } else {
    res.status(400).send('Message cannot be empty.');
  }
});

// Export the app to Firebase Functions
exports.app = functions.https.onRequest(app);
