const express = require("express");
const router = express.Router();

const {
  createNotebook,
  getNotebooks,
} = require("../controllers/notebookController");

router.post("/", createNotebook);

router.get("/", getNotebooks);

module.exports = router;