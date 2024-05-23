import mongoose, { connect } from "mongoose";

export const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to the mongo db database");
  } catch (error) {
    console.log(error);
  }
};
