const { GoogleGenerativeAI } = require("@google/generative-ai");
const Document = require("../models/Document");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateSummary = async (req, res) => {
  try {
    const { documentId } = req.body;

    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    console.log("Document Found");
    console.log("Content Length:", document.content?.length);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Create exam-friendly notes from the document.

DOCUMENT:
${document.content?.substring(0, 5000)}
`;

    console.log("Calling Gemini...");

    const result = await model.generateContent(prompt);

    console.log("Gemini Success");

    res.status(200).json({
      summary: result.response.text(),
    });
  } catch (error) {
    console.log("SUMMARY ERROR:");
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  generateSummary,
};