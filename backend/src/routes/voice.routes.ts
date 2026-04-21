import express from "express";
import multer from "multer";
import { handleVoice } from "../controllers/voice.controller";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/voice", upload.single("audio"), handleVoice);

export default router;