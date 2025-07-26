import mongoose from 'mongoose';
import validator from 'validator';  
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: true,
    },
    lastName: {
      type: String,
        required: true,
        unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9._%+-]+@tylac\.lk$/.test(value);
        },
        message: (props) =>
          `${props.value} is not a valid user email! Email must end with "@tylac.lk".`,
      },
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return validator.isMobilePhone(value, "any", { strictMode: false });
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    image: {
      type: String,
      default: "https://example.com/default-profile.png", // Default image URL
      validate: {
        validator: function (value) {
          return validator.isURL(value);
        },
        message: (props) => `${props.value} is not a valid image URL!`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);