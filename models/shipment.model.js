import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const shipmentSchema = new mongoose.Schema(
  {
    trackingNumber: {
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
    carrierName: {
      type: String,
      required: true,
      trim: true,
    },
    carrierIdentifier: {
      type: String,
      required: true,
      trim: true,
    },
    shipmentDate: {
      type: Date,
      required: true,
    },
    DeliveryDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Shipped', 'In Transit', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
      required: true,
    },
  },
  { timestamps: true }
);