const fs = require("fs");
const pdfParse = require("pdf-parse");

const Document = require("../models/Document");

const uploadPDF = async (req, res) => {
  try {
    const { notebookId } = req.body;

    const dataBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdfParse(dataBuffer);

    const document = await Document.create({
      notebookId,
      fileName: req.file.originalname,
      content: pdfData.text,
    });

    // Delete uploaded PDF after extracting text
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      message: "PDF Uploaded Successfully",
      document,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find();

    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getDocumentsByNotebook = async (req, res) => {
  try {
    const { notebookId } = req.params;

    const documents = await Document.find({
      notebookId,
    });

    res.status(200).json(documents);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteDocument = async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Document Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadPDF,
  getDocuments,
  getDocumentsByNotebook,
  deleteDocument,
};
