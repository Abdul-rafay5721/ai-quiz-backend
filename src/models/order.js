
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    address: String,
    cartItems: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        productName: String,
        userId: String,
        quantity: Number,
        price: Number,
      }
    ],
    totalAmount: Number,
    paymentStatus: String,
    paymentIntentId: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deleteDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const OrderSchemaDB = mongoose.model('order', orderSchema);
module.exports = OrderSchemaDB;

