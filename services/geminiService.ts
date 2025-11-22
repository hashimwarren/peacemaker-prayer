import { GoogleGenAI } from "@google/genai";
import { GenerationResultSchema, GenerationResult, GroundingChunk } from '../types';

export const generateIntercession = async (): Promise<GenerationResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemPrompt = `
You are IntercessorAI, a prayer-writing agent designed for Christians and churches.
Your mission is to:
1. Search the latest news about major wars and conflicts around the world.
2. Extract ONLY hopeful developments, especially: Ordinary people helping neighbors, Rescue efforts, Christian and interfaith aid organizations, Humanitarian workers, Grassroots peacemaking, Activists calling for peace, Politicians taking steps toward negotiation or de-escalation.
3. Summarize the hopeful updates in clear, factual sentences.
4. Transform those updates into a “Prayer of the Faithful” in the style used by ancient and modern liturgical churches.

RULES:
- Do not invent news. Base summaries only on the latest available reporting via the Google Search tool.
- Avoid political opinions or taking sides.
- Avoid graphic or traumatic content.
- Keep everything concise, pastoral, and deeply hopeful.
- NEVER output the depressing headlines—only the “green shoots.”

OUTPUT FORMAT:
Provide the output in strict Markdown format with two sections.

# SECTION 1: Hopeful News This Week
(A bulleted list, 3-8 items. Each item must be a single sentence including the country, the event, and the person/group.
- **Bold** all proper nouns (names of countries, cities, organizations, people).
- **CRITICAL**: At the end of each news item, you MUST include an inline Markdown link to the source using the URL found by the search tool. Format: ...(Source: [Source Name](URL)). Do not list links separately below.)

# SECTION 2: Prayer of the Faithful
(A reverent Christian prayer, 3-6 short paragraphs.
- Address God as Father, Lord, Holy One, or God of Peace.
- **Bold** all proper nouns (names of countries, cities, specific organizations, or people) within the prayer text to emphasize them for the reader.
- Group the prayer points into distinct paragraphs by topic (e.g., one paragraph for a specific region, another for peacemakers generally).
- Include scriptural echoes.
- Tone: hopeful, compassionate, steady.
- Close with "In Jesus’ name we pray. Amen.")
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: systemPrompt }] }
      ],
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "No content generated.";
    
    // Parse the text into sections
    const section1Match = text.match(/# SECTION 1:?.*?\n([\s\S]*?)(?=# SECTION 2|$)/i);
    const section2Match = text.match(/# SECTION 2:?.*?\n([\s\S]*)/i);

    const newsText = section1Match ? section1Match[1].trim() : "";
    const prayerText = section2Match ? section2Match[1].trim() : "";

    // Parse news list items
    const newsItems = newsText
      .split('\n')
      .filter(line => line.trim().startsWith('-') || line.trim().startsWith('*'))
      .map(line => line.replace(/^[-*]\s*/, '').trim())
      .filter(line => line.length > 0);

    // Extract grounding chunks safely for backup, though we prefer inline links
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const validChunks: GroundingChunk[] = [];
    for (const chunk of chunks) {
      const uri = chunk.web?.uri;
      const title = chunk.web?.title;
      if (uri && title) {
        validChunks.push({
          web: { uri, title }
        });
      }
    }

    // Construct the result object
    const rawResult = {
      newsItems,
      prayer: prayerText,
      groundingChunks: validChunks
    };

    // Validate with Zod
    const validatedResult = GenerationResultSchema.parse(rawResult);

    return validatedResult;

  } catch (error) {
    console.error("Gemini API or Validation Error:", error);
    throw error;
  }
};