// Using ES6 imports
import mongoose from "mongoose";
import { env } from "process";

// const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
  .connect(env.MONGODB_URL)
  .then(() => console.log("Connected!"))
  .catch((err) => console.log("Mongo connect failure!", err));
