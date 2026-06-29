const { GoogleGenerativeAI } = require("@google/generative-ai");
const Document = require("../models/Document");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateQuiz = async (req, res) => {
  try {
    console.log("Quiz API Hit");

    const { documentId } = req.body;

    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Generate exactly 5 MCQs from the document.

Return ONLY valid JSON.

Format:

[
  {
    "question":"Question here",
    "options":[
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "answer":"Correct Option",
    "explanation":"One line explanation"
  }
]

DOCUMENT:
${document.content}
`;

    const result = await model.generateContent(prompt);

    console.log("Calling Gemini...");

    const text = result.response.text();

    console.log("Gemini Response:");
    console.log(text);

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const quiz = JSON.parse(cleanText);

    res.status(200).json(quiz);
  } catch (error) {
    console.log(error);

    console.error("Quiz Error:", error);

    res.status(500).json({
      message:
        "AI service is busy right now. Please try again in a few seconds.",
    });
  }
};

module.exports = {
  generateQuiz,
};
