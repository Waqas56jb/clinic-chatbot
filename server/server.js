import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

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
You must always respond in Spanish, even if the user writes in English or any other language.

Output requirements:
1) Start with an H2 heading
2) Add one short bold summary line
3) Provide 3-4 concise bullet points
4) Optional one-line next step
Keep total response under 110 words.
Tone: professional, structured, concise.
`.trim();

async function classifyScope(message) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
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
    })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || "Fallo la clasificacion de alcance.");
  }

  const raw = (data?.output_text || "").trim().toUpperCase();
  return raw.includes("IN_SCOPE") ? "IN_SCOPE" : "OUT_OF_SCOPE";
}

function outOfScopeResponse() {
  return [
    "## Asistente de Chatbot Clinico",
    "",
    "**Aviso de Alcance:** Solo puedo responder preguntas sobre clinicas y chatbots de salud.",
    "",
    "### En que puedo ayudarte",
    "- Flujos de reserva de citas",
    "- Automatizacion de preguntas frecuentes de pacientes",
    "- Calificacion de prospectos para clinicas",
    "- Escalacion del chatbot al personal de la clinica",
    "",
    "Por favor, haz una pregunta relacionada con clinicas."
  ].join("\n");
}

app.post("/api/chat", async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "Falta OPENAI_API_KEY en el servidor."
      });
    }

    const { message } = req.body ?? {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Se requiere un mensaje valido." });
    }

    const scope = await classifyScope(message);
    if (scope !== "IN_SCOPE") {
      return res.json({ reply: outOfScopeResponse() });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: [
          {
            role: "system",
            content: [{ type: "input_text", text: RESPONSE_SYSTEM_PROMPT }]
          },
          {
            role: "user",
            content: [{ type: "input_text", text: message }]
          }
        ]
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(500).json({
        error: "Fallo la solicitud a OpenAI.",
        details: data?.error?.message || "Error desconocido"
      });
    }

    return res.status(200).json({
      reply: data?.output_text || outOfScopeResponse()
    });
  } catch (error) {
    return res.status(500).json({
      error: "No se pudo generar la respuesta clinica.",
      details: error?.message || "Error desconocido"
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor de chatbot clinico ejecutandose en http://localhost:${port}`);
});
