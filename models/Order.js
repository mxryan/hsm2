const mongoose = require("mongoose");
const mongooseTimestamp = require('mongoose-timestamp');

const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: "Name is Required"
  },
  // add email validation
  email: {
    type: String,
    trim: true,
    required: "Email is required"
  },
  orders: [{
    item: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
    }
  }],
  complete: {
    type: Boolean,
    default: false
  }
})
OrderSchema.plugin(mongooseTimestamp);
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;