const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    notebookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notebook",
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Document",
  documentSchema
);