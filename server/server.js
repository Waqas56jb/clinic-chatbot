import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const port = process.env.PORT || 3001;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(cors());
app.use(express.json());

const SCOPE_CLASSIFIER_PROMPT = `
You are a strict scope classifier for a clinic chatbot assistant.
Classify the user message into exactly one label:
- IN_SCOPE: clinic operations, patient communication, appointment workflow, healthcare service messaging, medical practice chatbot usage, lead generation for clinics.
- OUT_OF_SCOPE: any unrelated topic.

Rules:
1) Greetings (hi/hello) are IN_SCOPE.
2) If uncertain but likely clinic/business-healthcare related, return IN_SCOPE.
3) Output only one token: IN_SCOPE or OUT_OF_SCOPE.
`.trim();

const RESPONSE_SYSTEM_PROMPT = `
You are a professional clinic chatbot assistant for lead generation and patient communication.
You must answer only clinic and healthcare-chatbot related questions.
If the topic is outside clinic scope, politely decline and request a clinic-related question.

Output requirements:
1) Start with an H2 heading
2) Add one short bold summary line
3) Provide 3-4 concise bullet points
4) Optional one-line next step
Keep total response under 110 words.
Tone: professional, structured, concise.
`.trim();

async function classifyScope(message) {
  const classification = await client.responses.create({
    model: "gpt-4o-mini",
    input: [
      {
        role: "system",
        content: [{ type: "input_text", text: SCOPE_CLASSIFIER_PROMPT }]
      },
      {
        role: "user",
        content: [{ type: "input_text", text: message }]
      }
    ]
  });

  const raw = (classification.output_text || "").trim().toUpperCase();
  return raw.includes("IN_SCOPE") ? "IN_SCOPE" : "OUT_OF_SCOPE";
}

function outOfScopeResponse() {
  return [
    "## Clinic Chatbot Assistant",
    "",
    "**Scope Notice:** I can only answer clinic and healthcare chatbot questions.",
    "",
    "### What I can help with",
    "- Appointment booking flows",
    "- Patient FAQ automation",
    "- Lead qualification for clinics",
    "- Handover from chatbot to clinic staff",
    "",
    "Please ask a clinic-related question."
  ].join("\n");
}

app.post("/api/chat", async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "Server is missing OPENAI_API_KEY."
      });
    }

    const { message } = req.body ?? {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "A valid message is required." });
    }

    const scope = await classifyScope(message);
    if (scope !== "IN_SCOPE") {
      return res.json({ reply: outOfScopeResponse() });
    }

    const completion = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: RESPONSE_SYSTEM_PROMPT
            }
          ]
        },
        {
          role: "user",
          content: [{ type: "input_text", text: message }]
        }
      ]
    });

    const reply = completion.output_text || outOfScopeResponse();
    return res.json({ reply });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to generate clinic response.",
      details: error?.message || "Unknown error"
    });
  }
});

app.listen(port, () => {
  console.log(`Clinic chatbot server running on http://localhost:${port}`);
});
