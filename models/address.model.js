import mongoose from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';

const addressSchema = new mongoose.Schema(
  {
    street: {
      type: String,
      required: true,
    },
    street2: {
      type: String,
        default: '',
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return validator.isPostalCode(value, 'any');
        },
        message: (props) => `${props.value} is not a valid postal code!`,
      },
    },
    country: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    dealer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dealer',
      required: false,
    },
  },
  { timestamps: true }
);

// Method to create a new address
// we have to use either user or dealer for address not both
//code it later