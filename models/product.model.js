import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    basePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    finalPrice: {
      type: Number,
        required: true,
        min: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    imageUrl: {
      type: String,
      default: 'https://example.com/default-product.png', // Default image URL
      validate: {
        validator: function (value) {
          return validator.isURL(value);
        },
        message: (props) => `${props.value} is not a valid image URL!`,
      },
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);