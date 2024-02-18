import app from "./app.js";
import colors from "colors";
import connectDB from "./database/db.js";
import cloudinary from "cloudinary";

// port
const PORT = process.env.PORT || 8008;

// Configure Cloudinary with your credentials
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

// calling database function
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`.bgBlack.bold);
    });
  })
  .catch((error) => {
    console.log(
      `error while connecting to database so port will not run!! ${error}`.bgRed
        .bold
    );
  });
