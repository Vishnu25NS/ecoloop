const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const Busboy = require("busboy");
const cors = require("cors")({ origin: true });

admin.initializeApp();

// IMPORTANT: You will need to set your Hugging Face API Key in your Firebase environment.
// I will show you how to do this in the next step.
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_KEY;
const AI_MODEL_URL = "https://api-inference.huggingface.co/models/garythung/trashnet-convnet";

exports.classifyWaste = functions.https.onRequest((req, res) => {
  // Use CORS to allow requests from your web app
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const busboy = Busboy({ headers: req.headers });
    let imageData = null;

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      // Make sure the uploaded file is an image
      if (mimetype.startsWith("image/")) {
        const chunks = [];
        file.on("data", (chunk) => {
          chunks.push(chunk);
        });
        file.on("end", () => {
          imageData = Buffer.concat(chunks);
        });
      }
    });

    busboy.on("finish", async () => {
      if (!imageData) {
        return res.status(400).json({ error: "No image file provided." });
      }

      try {
        // Call the Hugging Face AI model with the image data
        const aiResponse = await fetch(AI_MODEL_URL, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${HUGGING_FACE_API_KEY}`,
            "Content-Type": "image/jpeg", // The model expects a specific content type
          },
          body: imageData,
        });

        if (!aiResponse.ok) {
          const errorBody = await aiResponse.text();
          console.error("Hugging Face API Error:", errorBody);
          return res.status(500).json({ error: "Failed to classify image with the AI model." });
        }

        const predictions = await aiResponse.json();
        
        // The AI returns a list of possibilities. Find the one with the highest score.
        const bestPrediction = predictions.reduce(
          (prev, current) => (prev.score > current.score) ? prev : current
        );

        // Send the best prediction back to your React app
        return res.status(200).json(bestPrediction);

      } catch (error) {
        console.error("Error calling Hugging Face API:", error);
        return res.status(500).json({ error: "An internal server error occurred." });
      }
    });

    busboy.end(req.rawBody);
  });
});
