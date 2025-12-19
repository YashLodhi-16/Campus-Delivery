import "dotenv/config";
import "./db/firebaseAdmin.js";
import express from "express";

const PORT = process.env.PORT || 8000;

const app = express();

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log("Running on PORT: " + PORT);
});
