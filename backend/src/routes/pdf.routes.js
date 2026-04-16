import express from "express";
import multer from "multer";
import { uploadPDF } from "../controllers/pdf.controller.js";

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files allowed"));
    }
  }
});


const router = express.Router();

/**
 * @swagger
 * /api/pdf/upload:
 *   post:
 *     summary: Upload a PDF file
 *     description: Upload a PDF file, extract its text, and split it into chunks.
 *     tags:
 *       - PDF
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               pdf:
 *                 type: string
 *                 format: binary
 *                 description: The PDF file to upload
 *     responses:
 *       200:
 *         description: PDF processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 chunks:
 *                   type: number
 *                 embeddings: 
 *                   type: number
 *       500:
 *         description: PDF processing failed
 */

router.post("/upload", upload.single("pdf"), uploadPDF);

export default router;
