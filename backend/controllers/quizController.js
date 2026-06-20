const { GoogleGenerativeAI } = require("@google/generative-ai");
const Document = require("../models/Document");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const generateQuiz = async (req, res) => {
  try {
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
Generate exactly 5 MCQs.

For each MCQ provide:
Question
A)
B)
C)
D)
Correct Answer

DOCUMENT:
${document.content}
`;

    const result = await model.generateContent(prompt);

    res.status(200).json({
      quiz: result.response.text(),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  generateQuiz,
};