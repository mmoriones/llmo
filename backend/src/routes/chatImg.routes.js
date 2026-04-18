import express from "express";
import { chatWithImageAI } from "../controllers/chatImg.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/ai/chat/img:
 *   post:
 *     summary: Chat with uploaded image
 *     description: Sends prompt with previously uploaded image
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - messages
 *             properties:
 *               messages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - role
 *                     - content
 *                   properties:
 *                     role:
 *                       type: string
 *                       example: user
 *                     content:
 *                       type: string
 *                       example: What objects are visible in this image?
 */


router.post("/chat/img", chatWithImageAI);

export default router;
