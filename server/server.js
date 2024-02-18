import app from "./app.js";
import colors from "colors";
import connectDB from "./database/db.js";

const PORT = process.env.PORT || 8008;

// calling database function
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`.bgBlack.bold);
    });
  })
  .catch((error) => {
    console.log(`error while connecting to database so port will not run!! ${error}`.bgRed.bold);
  });
