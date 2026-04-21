import { Request, Response } from "express";
import { speechToText } from "../services/speech.service";
import { textToSpeech } from "../services/tts.service";
import { runAgent } from "../agents/agent";
import { trackLatency } from "../utils/latency";

export const handleVoice = async (req: Request & { file?: any }, res: Response) => {
  try {
    const audioPath = req.file?.path;
    if (!audioPath) return res.status(400).json({ error: "No audio" });

    const sttTimer = trackLatency();
    const text = await speechToText();
    const sttTime = sttTimer.end();

    const agentTimer = trackLatency();
    const reply = await runAgent(text, "session-1");
    const agentTime = agentTimer.end();

    const ttsTimer = trackLatency();
    const output = `outputs/response-${Date.now()}.mp3`;
    await textToSpeech(reply || "", output);
    const ttsTime = ttsTimer.end();

    res.json({
      reply,
      audioFile: output,
      latency: { sttTime, agentTime, ttsTime }
    });
  } catch (err: any) {
    res.status(500).json({
      error: "Error",
      message: err.message
    });
  }
};