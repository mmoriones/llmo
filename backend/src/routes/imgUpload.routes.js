import express from "express";
import multer from "multer";
import { uploadImageController } from "../controllers/imgUpload.controller.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

/**
 * @swagger
 * /api/ai/upload-image:
 *   post:
 *     summary: Upload image for AI vision
 *     description: Uploads an image file and stores it in memory for later prompts
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded and cached
 */

router.post("/upload-image", upload.single("image"), uploadImageController);

export default router;
