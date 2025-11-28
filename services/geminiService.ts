import { GoogleGenAI } from "@google/genai";

// Lazy initialize the client only when needed
const getAIClient = () => {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
    return null;
  }

  return new GoogleGenAI({ apiKey });
};

export const askAIAdvisor = async (userQuestion: string): Promise<string> => {
  try {
    const ai = getAIClient();

    if (!ai) {
      return "AI aðstoðin er ekki tiltæk í augnablikinu. Vinsamlegast hafðu samband við okkur beint eða bókaðu fund til að fá frekari upplýsingar.";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuestion,
      config: {
        systemInstruction: `Þú ert sérfræðingur hjá LioraTech, ráðgjafafyrirtæki í gervigreind (AI).
        Þú ert að svara spurningum á vefsíðu sem selur "AI Playbook" og ráðgjöf til fyrirtækja.
        Tónninn þinn er faglegur, traustvekjandi og hvetjandi.
        Markmið þitt er að hvetja notandann til að bóka fund eða kaupa Playbookið.
        Svaraðu alltaf á íslensku. Haltu svörum stuttum og hnitmiðuðum.`,
        thinkingConfig: { thinkingBudget: 0 }
      },
    });

    return response.text || "Afsakið, ég náði ekki að svara þessu í augnablikinu.";
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Villa kom upp við að tengjast gervigreindinni. Vinsamlegast reyndu aftur síðar.";
  }
};