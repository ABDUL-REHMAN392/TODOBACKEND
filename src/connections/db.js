import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGO_DB_URI}/${process.env.DATA_BASE_NAME}`
    );
    console.log(`Mongodb connect successfully`);
  } catch (error) {
    console.log("mongodb connection error", error);
  }
};
