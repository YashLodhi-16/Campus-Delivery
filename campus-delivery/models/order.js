import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
  phone: String,
  name: String,
  address: Object,
  cart: Array,
  paymentMethod: String,
  subtotal: Number,
  deliveryFee: Number,
  total: Number,
  status: { type: String, default: "PLACED" }
}, { timestamps: true })

export default mongoose.models.Order || mongoose.model("Order", OrderSchema)
