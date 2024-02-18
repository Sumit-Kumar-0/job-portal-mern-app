import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log(
      `connect to database with host name  ${connection.connection.host}`
        .bgGreen.bold
    );
    return connection;
  } catch (error) {
    console.log(`error while connecting to database.`.bgRed.bold);
    throw error;
  }
};

export default connectDB;
