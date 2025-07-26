import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const dealerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate: {
                validator: validator.isEmail,
                message: (props) => `${props.value} is not a valid email!`,
            },
        },
        phoneNumber: {
            type: String,
            required: true,
            trim: true,
        },
        contactPerson: {
            type: String,
            required: true,
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);