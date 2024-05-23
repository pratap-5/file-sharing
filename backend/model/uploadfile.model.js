import mongoose from "mongoose";

const FileSchema = mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  downloadContent: {
    type: Number,

    default: 0,
  },
});

const File = mongoose.model("uploadfiles", FileSchema);
export default File;
