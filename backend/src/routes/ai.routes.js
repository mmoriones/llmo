import express from "express";
import { chatWithAI } from "../controllers/ai.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/ai/chat:
 *   post:
 *     summary: Send prompt to AI
 *     description: Sends text to Ollama and returns response
 *     requestBody:
 *       required: true
 *       content:
 *         text/plain:
 *           schema:
 *             type: string
 *     responses:
 *       200:
 *         description: AI response
 */

router.post("/chat", chatWithAI);

export default router;
