import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { script, style, sceneCount, ratio } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "API Key not found. Please set GEMINI_API_KEY in .env.local" },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
      You are an expert AI Film Director.
      Analyze the following video script and extract exactly 5 key scenes for a storyboard.
      
      Script: "${script}"
      
      Visual Style: ${style}
      Aspect Ratio: ${ratio}
      Target Scene Count: ${sceneCount} (Note: Summarize into exactly 5 key scenes for this overview)

      Output MUST be a strict JSON array of objects. Do not include markdown formatting (like \`\`\`json).
      Each object must have these keys:
      - sceneNumber (number)
      - place (string: concise location)
      - time (string: e.g., "Day", "Night", "Sunset")
      - action (string: descriptive action details)
      - cameraAngle (string: e.g., "Close-up", "Wide Shot", "Low Angle")

      Example format:
      [
        { "sceneNumber": 1, "place": "Park", "time": "Day", "action": "Protagonist walking alone...", "cameraAngle": "Wide Shot" }
      ]
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("Gemini Raw Response:", text); // Debugging

        // Clean up markdown if present (Gemini sometimes adds it)
        const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        try {
            const parsedData = JSON.parse(cleanedText);
            return NextResponse.json(parsedData);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError);
            return NextResponse.json(
                { error: "Failed to parse AI response", raw: text },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error("Generation Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
