
import { FashionAnalysis, Language, ModelId } from "../types";
import { getPrompts } from "../utils/translations";

// Helper to convert File to Base64
const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const analyzeOutfitImage = async (file: File, lang: Language, modelId: ModelId): Promise<FashionAnalysis> => {
  try {
    const base64Data = await fileToGenerativePart(file);
    
    // API Key from process.env as per guidelines for the environment
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      console.error("API Key is missing. Please ensure API_KEY is set in the environment.");
      throw new Error("API Key is missing configuration.");
    }

    const prompts = getPrompts(lang);

    const payload = {
      model: modelId,
      messages: [
        {
          role: "system",
          content: prompts.system
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompts.user
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${file.type};base64,${base64Data}`
              }
            }
          ]
        }
      ]
    };

    const response = await fetch("https://ark.cn-beijing.volces.com/api/v3/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) throw new Error("No response from AI");

    // Clean up content if the model wraps it in markdown code blocks
    const cleanedContent = content.replace(/```json\n?|```/g, '').trim();

    return JSON.parse(cleanedContent) as FashionAnalysis;

  } catch (error) {
    console.error("Error analyzing outfit:", error);
    throw error;
  }
};
