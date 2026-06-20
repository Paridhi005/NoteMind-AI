const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  uploadPDF,
  getDocuments,
  getDocumentsByNotebook,
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

module.exports = router;