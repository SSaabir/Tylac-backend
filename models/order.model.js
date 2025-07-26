import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dealerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dealer',
        required: false,
        },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Pending', 'Shipped','Confirmed' , 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    shippingAddress: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

//either user or dealer can be used for order
//code it later
