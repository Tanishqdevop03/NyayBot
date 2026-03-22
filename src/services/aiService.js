import { prompt } from '../utils/prompt'

export const getLegalAdvice = async (question) => {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: question },
      ],
    }),
  });

  const data = await res.json();
  return data.choices[0].message.content;
}