import { CohereClientV2 } from "cohere-ai";
import { useState, useEffect } from "react";
import { COHERE_CLIENT_TOKEN } from "./env";

export const useAI = (input: string) => {
  const [aiResponse, setAiResponse] = useState("");
  const cohere = new CohereClientV2({
    token: COHERE_CLIENT_TOKEN,
  });

  useEffect(() => {
    if (input.length > 0) fetchData();
  }, [input]);

  const fetchData = async () => {
    const response = await cohere.chat({
      model: "command-r-plus",
      messages: [
        {
          role: "user",
          content: `The context is LinkedIn chat.
           Your role is to either reply to an existing message or generate a new message based on the user’s input.
           The user's prompt (inside double quotes) will determine whether you're responding to a message or creating a new one.
           For replies, be concise and professional, professional means 100% proffesional. keeping your response under 200 characters, 
           and extend to 250 characters only if more detail is requested. you should clearly underand user want send a message or reply a message.
           if the user send input almost same to previous one or similar to previous double check your reply and make you really understand the question and context.
           keep a format for some specific category messages and use normal words like the response does's felt like a AI written response so keep normal familiar professional words.
           dont create headache to a reader .
           Always avoid referencing instructions or setup details, and remove the double quotes from the generated response.
           Respond appropriately to: ${input}.`,
        },
      ],
    });
    if(response?.message?.content)
    setAiResponse(response?.message?.content[0]?.text!);
  };

  return aiResponse;
};
