import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const inquirySchema = new mongoose.Schema(
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
    inquiryType: {
      type: String,
      enum: ['Product Inquiry', 'Order Inquiry', 'General Inquiry'],
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Closed'],
      default: 'Open',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);