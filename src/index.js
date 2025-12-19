import "dotenv/config";
import "./db/firebaseAdmin.js";
import express from "express";
import globalErrorHandler from "./lib/helpers/globalErrorHandler.js";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log("Running on PORT: " + PORT);
});
