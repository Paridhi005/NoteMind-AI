const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  uploadPDF,
  getDocuments,
  getDocumentsByNotebook,
  deleteDocument,
} = require("../controllers/documentController");

router.get(
  "/notebook/:notebookId",
  getDocumentsByNotebook
);

router.post(
  "/upload",
  upload.single("pdf"),
  uploadPDF
);

router.get("/", getDocuments);

router.delete("/:id", deleteDocument);

module.exports = router;