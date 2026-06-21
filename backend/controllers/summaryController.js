const { GoogleGenerativeAI } = require("@google/generative-ai");
const Document = require("../models/Document");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const generateSummary = async (req, res) => {
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
Create exam-friendly notes from the document.

Format:
1. Key Concepts
2. Important Points
3. Quick Revision Notes

DOCUMENT:
${document.content}
`;

    console.log("Calling Gemini...");
    
    const result = await model.generateContent(prompt);

    console.log("Gemini Response Received");

    res.status(200).json({
      summary: result.response.text(),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  generateSummary,
};