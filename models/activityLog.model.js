import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const activityLogSchema = new mongoose.Schema(
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
    action: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    ipAddress: {
      type: String,
      validate: {
        validator: function (value) {
          return validator.isIP(value);
        },
        message: (props) => `${props.value} is not a valid IP address!`,
      },
    },
  },
  { timestamps: true }
);