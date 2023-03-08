// Using ES6 imports
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SstpSchema = new Schema({
  hostname: { type: String, default: "" },
  ip: { type: String, default: "" },
  port: { type: Number, default: 443 },
  info: { type: String, default: "" },
  info2: { type: String, default: "" },
  location: {
    country: { type: String, default: "" },
    short: { type: String, default: "" },
    name: { type: String, default: "" },
  },
  createdAt: { type: Date, default: Date.now },
});

SstpSchema.index({ ip: 1, port: 1 }, { unique: true });

SstpSchema.statics.bulkUpsert = async function (sstps) {
  let uniques = [];

  for (let sstp of sstps) {
    const found = await this.exists({ ip: sstp.ip, port: sstp.port });
    if (found) continue;
    uniques.push(sstp);
  }

  return this.insertMany(uniques);
};

export default mongoose.models.SstpModel ||
  mongoose.model("SstpModel", SstpSchema, "sstps");
