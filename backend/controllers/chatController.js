const { GoogleGenerativeAI } = require("@google/generative-ai");
const Document = require("../models/Document");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatWithDocument = async (req, res) => {
  try {
    const { documentId, question } = req.body;

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
You are an AI assistant.

Answer ONLY using the document content below.

If the answer is not present in the document, reply:

"I cannot answer this question based on the provided document."

DOCUMENT:
${document.content}

QUESTION:
${question}
`;

    const result = await model.generateContent(prompt);
    console.log("Calling Gemini...");

    res.status(200).json({
      answer: result.response.text(),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  chatWithDocument,
};
