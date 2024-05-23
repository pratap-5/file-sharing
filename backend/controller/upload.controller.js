import { response } from "express";
import File from "../model/uploadfile.model.js";

export const uploadFile = async (req, res) => {
  const fileObj = {
    path: req.file.path,
    name: req.file.originalname,
  };

  try {
    const file = await File.create(fileObj);

    console.log(`http://localhost:8000/file/${file._id}`);
    res.status(201).json({ path: `http://localhost:8000/file/${file._id}` });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const downloadImage = async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId);
    file.downloadContent++;
    await file.save();

    return res.download(file.path, file.name);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error " });
  }
};
