import multer from "multer";

const upload = multer({ dest: "./uploads_files" });
export default upload;
