const Notebook = require("../models/Notebook");
const Document = require("../models/Document");

const createNotebook = async (req, res) => {
  try {
    const { title, userId } = req.body;

    const notebook = await Notebook.create({
      title,
      userId,
    });

    res.status(201).json(notebook);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getNotebooks = async (req, res) => {
  try {
    const { userId } = req.query;

    const notebooks = await Notebook.find({
      userId,
    });

    res.status(200).json(notebooks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getNotebookById = async (req, res) => {
  try {
    const notebook = await Notebook.findById(req.params.id);

    res.status(200).json(notebook);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteNotebook = async (req, res) => {
  try {
    const notebookId = req.params.id;

    await Document.deleteMany({
      notebookId,
    });

    await Notebook.findByIdAndDelete(notebookId);

    res.status(200).json({
      message: "Notebook and Documents Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const notebookCount = await Notebook.countDocuments();

    const documentCount = await Document.countDocuments();

    res.status(200).json({
      notebooks: notebookCount,
      documents: documentCount,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createNotebook,
  getNotebooks,
  getNotebookById,
  deleteNotebook,
  getDashboardStats,
};
