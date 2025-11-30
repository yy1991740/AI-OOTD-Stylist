import { NextResponse } from 'next/server';
import { getPrompts } from '../../../utils/translations';
import { Language } from '../../../types';

export async function POST(req: Request) {
  try {
    const { base64Data, lang, modelId, fileType } = await req.json();
    
    // API Key from process.env
    const apiKey = process.env.DOUBAO_API_KEY;

    if (!apiKey) {
      console.error("API Key is missing. Please ensure DOUBAO_API_KEY is set in the environment.");
      return NextResponse.json({ error: "API Key is missing configuration." }, { status: 500 });
    }

    const prompts = getPrompts(lang as Language);

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
                url: `data:${fileType};base64,${base64Data}`
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
      console.error(`API Error: ${response.status} - ${errorText}`);
      return NextResponse.json({ error: `API Error: ${response.status} - ${errorText}` }, { status: response.status });
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) return NextResponse.json({ error: "No response from AI" }, { status: 500 });

    // Clean up content if the model wraps it in markdown code blocks
    const cleanedContent = content.replace(/```json\n?|```/g, '').trim();
    
    try {
        const parsed = JSON.parse(cleanedContent);
        return NextResponse.json(parsed);
    } catch (e) {
        console.error("Failed to parse JSON", cleanedContent);
        return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

  } catch (error) {
    console.error("Error analyzing outfit:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
