import { uploadImage } from "../services/imgUpload.service.js";

export const uploadImageController = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded"
      });
    }

    const filePath = req.file.path;

    await uploadImage(filePath);

    res.json({
      status: "Image uploaded and encoded",
      file: req.file.filename
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Image upload failed"
    });

  }

};
