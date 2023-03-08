// Using ES6 imports
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, default: "" },
  devices: [{ type: String }],
  expiredAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

// mongoose.model("User", UserSchema);
// mongoose.model("Sstp", SstpSchema);

export default mongoose.models.UserModel ||
  mongoose.model("UserModel", UserSchema, "users");
// export var SstpModel = mongoose.model("SstpModel", SstpSchema, "sstps");
