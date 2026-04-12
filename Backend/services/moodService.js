const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

const detectMoodFromMessage = async (msg, previousMood = "unknown") => {
  try {
    if (!msg) return "Neutral";

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `
        Analyze the emotional state of this student message.
        Keep the previous context in mind.

        Return ONLY one word from:
        Engaged, Neutral, Confused, Stressed, Bored

        Definitions:
        - Neutral = calm, normal, no strong emotional signal
        - Confused = does not understand concept, asks for clarification
        - Engaged = interested, focused, curious, actively learning
        - Bored = uninterested, low energy, not mentally involved
        - Stressed = pressure, anxiety, panic, overload, exam tension

        Previous mood: ${previousMood}

        Message:
        "${msg}"
        `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const currMood = response.text().trim();
    console.log(currMood);

    return currMood;
  } catch (err) {
    console.error("Mood detection error:", err);
    return "Neutral";
  }
};

module.exports = detectMoodFromMessage;