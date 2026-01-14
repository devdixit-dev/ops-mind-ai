import mongoose from "mongoose";

const connectToDatabase = async () => {
  await mongoose.connect(process.env.MONGO_DB_URL, { dbName: process.env.MONGO_DB_NAME })
  .then(() => console.log(`Database connected`));
}

export default connectToDatabase