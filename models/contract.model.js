import mongose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const contractSchema = new mongoose.Schema(
  {
    contractNumber: {
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
    terms: {
        type: String,
        required: true,
        trim: true,
    },
    
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    dealerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dealer',
      required: true,
    },
    discountPercentage: {
      type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    maxCreditDays: {
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