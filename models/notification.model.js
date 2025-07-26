import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const notificationSchema = new mongoose.Schema(
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
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ['info', 'warning', 'error', 'success', 'order', 'inquiry', 'review', 'shipment', 'payment', 'general'],
      default: 'info',
    },
  },
  { timestamps: true }
);