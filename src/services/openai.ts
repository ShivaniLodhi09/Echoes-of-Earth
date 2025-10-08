const OPENAI_API_KEY = "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";
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

const SYSTEM_PROMPT = `You are SpaceBot, a knowledgeable and friendly AI assistant for UncoverSpace - a NASA ocean and climate data exploration platform. Your role is to help users understand:

1. NASA's ocean observation missions (PACE, SWOT, ICESat-2, GRACE-FO)
2. Climate and ocean data visualization
3. The importance of ocean health and climate monitoring
4. How satellite data helps us understand Earth's systems
5. Virtual reality experiences for space and ocean exploration

Keep your responses:
- Informative but accessible to general audiences
- Enthusiastic about space and ocean science
- Concise (2-3 paragraphs max unless asked for more detail)
- Focused on the missions and data featured on the platform

When users ask about specific missions:
- PACE: Studies ocean color, phytoplankton, aerosols, and clouds
- SWOT: Measures ocean surface topography and water levels
- ICESat-2: Tracks ice sheet elevation and sea ice thickness
- GRACE-FO: Monitors Earth's gravity field and water movement

Always encourage exploration and curiosity about our planet!`;

export async function sendMessageToOpenAI(userMessage: string): Promise<string> {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenAI API Error:", errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error("No response from OpenAI");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
}
