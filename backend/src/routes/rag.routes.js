import express from "express";
import { chatWithRAG } from "../controllers/rag.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/ai/chat/rag:
 *   post:
 *     summary: Chat with AI using PDF context (RAG)
 *     description: Retrieves relevant document chunks using embeddings and sends them to the LLM with the user prompt.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               messages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                       example: user
 *                     content:
 *                       type: string
 *                       example: What does the document say about neural networks?
 *     responses:
 *       200:
 *         description: Streamed AI response using document context
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */

router.post("/chat/rag", chatWithRAG);

export default router;
