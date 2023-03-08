// Using ES6 imports
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const HostSchema = new Schema({
  hostname: { type: String, default: "", unique: true },
  ip: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

HostSchema.statics.bulkUpsert = async function (hosts) {
  let uniques = [];

  for (let host of hosts) {
    const found = await this.exists({ hostname: host.hostname });
    if (found) continue;
    uniques.push(host);
  }

  return this.insertMany(uniques);
};

export default mongoose.models.HostModel ||
  mongoose.model("HostModel", HostSchema, "hosts");
