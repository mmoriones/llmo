import express from "express";
import { chatWithAI } from "../controllers/chat.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/ai/chat:
 *   post:
 *     summary: Send prompt to AI
 *     description: Sends chat messages to Ollama and streams the response
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
 *                       example: Why is the sky blue?
 *     responses:
 *       200:
 *         description: Streamed AI response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */


router.post("/chat", chatWithAI);

export default router;
