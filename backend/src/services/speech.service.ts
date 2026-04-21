import OpenAI from "openai";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import path from "path";

ffmpeg.setFfmpegPath(ffmpegPath as string);

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const convertToWav = (input: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const output = input + ".wav";

    ffmpeg(input)
      .toFormat("wav")
      .on("end", () => resolve(output))
      .on("error", reject)
      .save(output);
  });
};

// export const speechToText = async (filePath: string) => {
//   try {
//     const wavPath = await convertToWav(filePath);

//     const res = await client.audio.transcriptions.create({
//       file: fs.createReadStream(wavPath),
//       model: "gpt-4o-mini-transcribe"
//     });

//     return res.text;
//   } catch (err) {
//     console.error("STT ERROR:", err);
//     throw err;
//   }
// };

let i = 0;

const flow = [
  "hello",
  "I have stomach pain",
  "Dr. Sneha Reddy",
  "11AM",
  "thanks"
];

export const speechToText = async () => {
  const text = flow[i];
  i = (i + 1) % flow.length;
  return text;
};