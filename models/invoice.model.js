import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
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
    issueDate: {
        type: Date,
        required: true,
        },
    dueDate: {
        type: Date,
        required: true,
        },
    billingAddress: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'Address',
      required: true,
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
        pricePerUnit: {
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
  },
  { timestamps: true }
);