const Notebook = require("../models/Notebook");

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
    const notebooks = await Notebook.find();

    res.status(200).json(notebooks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createNotebook,
  getNotebooks,
};