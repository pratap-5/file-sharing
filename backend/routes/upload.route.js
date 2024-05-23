import express from "express";

import upload from "../middleware/upload.js";
import { downloadImage, uploadFile } from "../controller/upload.controller.js";

const router = express.Router();

router.post("/api/upload", upload.single("file"), uploadFile);

router.get("/file/:fileId",downloadImage)

export default router;
