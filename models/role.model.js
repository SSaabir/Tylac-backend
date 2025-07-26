import mangoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const roleSchema = new mongoose.Schema({
  roleType: {
    type: String
    , enum: ['Admin', 'Customer', 'Manager', 'Guest', 'Employee', 'SalesRepresentative'],
    required: true,
    unique: true
    },
    description: {
        type: String,
        default: ''
        }
    },
    { timestamps: true }
);