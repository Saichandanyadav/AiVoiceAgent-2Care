import "dotenv/config";  // must be first

import express from "express";
import cors from "cors";
import voiceRoutes from "./routes/voice.routes";

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());
app.use("/outputs", express.static("outputs"));

app.use("/api", voiceRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running 🚀");
});