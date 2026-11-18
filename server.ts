import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Lazy initialization of the Gemini Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required but missing. Please configure it in your Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse incoming JSON payloads
  app.use(express.json());

  // API Route: Healthcheck
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // API Route: AI Synethesis / feedback generation
  app.post("/api/analyze", async (req, res) => {
    try {
      const { type, answers } = req.body;

      if (!type || !answers || !Array.isArray(answers)) {
        return res.status(400).json({ error: "Invalid request payload. Ensure type and answers array are present." });
      }

      const client = getGeminiClient();

      // Format answers for prompt
      const formattedAnswers = answers
        .map((a: { question: string; answer: string }) => `**Question:** ${a.question}\n**Candidate Response:** ${a.answer || "No response provided."}`)
        .join("\n\n");

      const systemInstruction = `You are an elite executive career coach and elite technical/non-technical behavioral interviewer.
Your goal is to perform a deep, compassionate, yet highly candidate-honest analysis of the candidate's reflection answers about their ${type} (strengths or weaknesses).
Use professional coaching models, avoid overly generic positive praise, and give concrete, specific, and actionable advice.
Provide your response strictly structured in valid JSON according to the schema provided. No markdown outer tags, just raw JSON.`;

      const prompt = `Please analyze the following exercise responses from a candidate focusing on knowing their ${type}:

${formattedAnswers}

Identify the key overarching patterns, extract their core ${type}, and formulate strategic interview advice. Customize your response perfectly to the answers they provided.`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              coreIdentifiedTheme: {
                type: Type.STRING,
                description: "A short, elegant title for the main theme or primary attribute identified (e.g. 'Integrative Problem Solver' or 'System-Level Execution Gap').",
              },
              executiveSummary: {
                type: Type.STRING,
                description: "A professional, cohesive 2-3 sentence analysis summarizing what their answers reveal about their self-awareness, behaviors, and core tendencies.",
              },
              deepAnalysis: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING, description: "Sub-finding or behavioral pattern title." },
                    details: { type: Type.STRING, description: "Detailed explanation of how this pattern manifests and was deduced from their reflections." },
                  },
                },
                description: "Detailed breakdown of 2-3 specific behavioral patterns or learnings found across their answers.",
              },
              interviewSignificance: {
                type: Type.STRING,
                description: "An explanation of how this specific trait typically gets evaluated or asked in an interview, and why it is critical for them to understand it.",
              },
              starMethodDraft: {
                type: Type.OBJECT,
                properties: {
                  situation: { type: Type.STRING, description: "How to set up the context based on their self-reflections." },
                  task: { type: Type.STRING, description: "The core challenge or standard task related to this trait." },
                  action: { type: Type.STRING, description: "The specific professional strategies and active words they should emphasize." },
                  result: { type: Type.STRING, description: "The constructive learning, impact, or self-corrective habits to highlight." },
                },
                description: "An outline of a powerful, natural interview response using the STAR method based on their reflective stories.",
              },
              coachingRoadmap: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                },
                description: "3 specific, concrete, of-the-shelf micro-habits or exercises they can perform in the next 30 days to either master this strength or manage/improve this weakness.",
              },
            },
            required: [
              "coreIdentifiedTheme",
              "executiveSummary",
              "deepAnalysis",
              "interviewSignificance",
              "starMethodDraft",
              "coachingRoadmap",
            ],
          },
        },
      });

      const responseText = response.text || "{}";
      const parsedData = JSON.parse(responseText);
      res.json(parsedData);
    } catch (error: any) {
      console.error("Analysis API Error:", error);
      res.status(500).json({ error: error.message || "Failed to analyze responses." });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
