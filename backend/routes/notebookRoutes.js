const express = require("express");
const router = express.Router();

const {
  createNotebook,
  getNotebooks,
  getNotebookById,
  deleteNotebook,
  getDashboardStats,  
} = require("../controllers/notebookController");

router.post("/", createNotebook);

router.get("/", getNotebooks);

router.get("/stats/dashboard", getDashboardStats);

router.get("/:id", getNotebookById);

router.delete("/:id", deleteNotebook);

module.exports = router;