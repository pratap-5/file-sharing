import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.routes.js";
import { connectToMongoDb } from "./db/connectToMongoDb.js";
import uploadRoute from "./routes/upload.route.js";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

app.use(cors({}));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/", uploadRoute);

// app.get("/",(req,res)=>{

// })

app.listen(port, () => {
  connectToMongoDb();
  console.log(`server runnig at http://localhost:${port}`);
});
