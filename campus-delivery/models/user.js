import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  _id: String, // phone
  name: String,
  phone: String,
}, { timestamps: true })

export default mongoose.models.User || mongoose.model("User", UserSchema)
