import OpenAI from "openai";
import fs from "fs";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export const textToSpeech = async (text: string, path: string) => {
//   const res = await client.audio.speech.create({
//     model: "gpt-4o-mini-tts",
//     voice: "alloy",
//     input: text
//   });

//   const buffer = Buffer.from(await res.arrayBuffer());
//   fs.writeFileSync(path, buffer);
// };


import path from "path";

export const textToSpeech = async (text: string, filePath: string) => {
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, "");
};