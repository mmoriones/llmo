import express from "express";
import { abortGeneration } from "../controllers/abort.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/ai/abort:
 *   post:
 *     summary: Abort AI generation
 *     description: Aborts the current Ollama streaming response
 *     responses:
 *       200:
 *         description: Generation successfully aborted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: aborted
 *       500:
 *         description: Abort failed
 */


router.post("/abort", abortGeneration);

export default router;
