import express from "express";
import { embedWithAI } from "../controllers/embed.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/ai/embed:
 *   post:
 *     summary: Embed
 *     description: Embed text using Ollama embeddings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               input:
 *                 type: string
 *                 example: "Why is the sky blue?"
 *     responses:
 *       200:
 *         description: AI response
 */


router.post("/embed", embedWithAI);

export default router;
