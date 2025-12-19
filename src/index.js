import { configDotenv } from "dotenv";
import express from "express";

const { parsed } = configDotenv();

if (!parsed) {
  process.exit(1);
}

const PORT = process.env.PORT || 8000;

const app = express();

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log("Running on PORT: " + PORT);
});
