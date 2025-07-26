import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const colorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    hexCode: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value);
        },
        message: (props) => `${props.value} is not a valid hex color code!`,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: false, // Optional, can be linked to a product
    },
  },
  { timestamps: true }
);