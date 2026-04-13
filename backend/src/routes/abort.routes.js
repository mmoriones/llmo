import express from "express";
import { abortGeneration } from "../controllers/abort.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/ai/abort:
 *   post:
 *     summary: Abort All Response Generation
 *     description: 
 *     requestBody:
 *       required: false
 *       content:
 *         text/plain:
 *           schema:
 *             type: string
 *     responses:
 *       200:
 *         description: AI response
 */

router.post("/abort", abortGeneration);

export default router;
