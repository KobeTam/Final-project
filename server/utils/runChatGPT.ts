import { Configuration, OpenAIApi } from "openai";

export async function chatGPT(text: string) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: text }],
  });
  const result = completion.data.choices[0].message;
  return result;
}

export async function chatGPTSummary(text: string, length: string) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const myPrompt = `Make a ${length} summary: `;
  const prompt = myPrompt + text;
  console.log("prompt: ", prompt);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  const result = completion.data.choices[0].message;
  return result;
}
