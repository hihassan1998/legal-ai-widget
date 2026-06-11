import mongoose from "mongoose";

const LawFirmSchema = new mongoose.Schema({
  name: String,
  email: String,
  widgetKey: String,
});

export default mongoose.models.LawFirm ||
  mongoose.model("LawFirm", LawFirmSchema);