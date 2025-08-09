// This is your local Express server
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fetch = require('node-fetch');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = 3001; // Use a different port than your React app

// Middleware
app.use(cors());
const upload = multer({ storage: multer.memoryStorage() });

// UPDATED: Using a more stable and accurate Hugging Face model
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_KEY;
// This is a general-purpose image classification model that is very reliable.
const AI_MODEL_URL = "https://api-inference.huggingface.co/models/google/vit-base-patch16-224";

// Define the classification endpoint
app.post('/classify', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided.' });
  }
  if (!HUGGING_FACE_API_KEY) {
    console.error("API Key is missing. Make sure HUGGING_FACE_KEY is in your server/.env file.");
    return res.status(500).json({ error: 'API Key not configured on server.' });
  }

  try {
    // The Hugging Face model expects the raw image data
    const imageData = req.file.buffer;

    // Call the Hugging Face AI model with the correct format
    const aiResponse = await fetch(AI_MODEL_URL, {
      method: 'POST',
      headers: {
        // Provide the API key and the correct content type for the image
        "Authorization": `Bearer ${HUGGING_FACE_API_KEY}`,
        "Content-Type": req.file.mimetype
      },
      body: imageData,
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("Hugging Face API Error:", errorText);
      throw new Error('Failed to classify image with AI model.');
    }

    const predictions = await aiResponse.json();

    // Find the prediction with the highest confidence score
    if (predictions && predictions.length > 0) {
      const bestPrediction = predictions.reduce(
        (prev, current) => (prev.score > current.score) ? prev : current
      );
      
      // Send the simple, clean response back to the React app
      return res.status(200).json(bestPrediction);

    } else {
      // Handle cases where the AI returns no predictions
      return res.status(404).json({ error: "AI could not identify any objects in the image." });
    }

  } catch (error) {
    console.error("Error processing image:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(port, () => {
  console.log(`🌍 EcoLoop local server listening on http://localhost:${port}`);
});
