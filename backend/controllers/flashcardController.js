const { GoogleGenerativeAI } = require("@google/generative-ai");
const Document = require("../models/Document");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateFlashcards = async (req, res) => {
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
Generate 5 study flashcards.

Format:
Q:
A:

DOCUMENT:
${document.content}
`;

    const result = await model.generateContent(prompt);

    console.log("Calling Gemini...");

    res.status(200).json({
      flashcards: result.response.text(),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  generateFlashcards,
};
