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
    throw new Error(data?.error?.message || "Scope classification failed.");
  }

  const raw = (data?.output_text || "").trim().toUpperCase();
  return raw.includes("IN_SCOPE") ? "IN_SCOPE" : "OUT_OF_SCOPE";
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { message } = req.body || {};

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OPENAI_API_KEY is missing on Vercel." });
    }

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "A valid message is required." });
    }

    const scope = await classifyScope(message);
    if (scope !== "IN_SCOPE") {
      return res.status(200).json({ reply: outOfScopeResponse() });
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
        error: "OpenAI request failed.",
        details: data?.error?.message || "Unknown error"
      });
    }

    return res.status(200).json({
      reply: data?.output_text || outOfScopeResponse()
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to generate clinic response.",
      details: error?.message || "Unknown error"
    });
  }
};
