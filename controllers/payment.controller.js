import mongoose from "mongoose";
import { errorHandler } from "../utils/errorHandler.js";
import payment from "../models/payment.model.js";   

// Get all payments
export const getAllPayments = async (req, res, next) => {
    try {
        const payments = await payment.find({}).sort({ createdAt: -1 });
        res.status(200).json(payments);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Get a single payment by ID
export const getSinglePayment = async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such payment' });
    }

    try {
        const paymentEntry = await payment.findById(id);
        if (!paymentEntry) {
            return next(errorHandler(404, 'Payment Not Found'));
        }
        res.status(200).json(paymentEntry);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Delete a payment
export const deletePayment = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such payment' });
    }

    try {
        const paymentEntry = await payment.findByIdAndDelete(id);
        if (!paymentEntry) {
            return next(errorHandler(404, 'Payment Not Found'));
        }
        res.json({ message: 'Deleted Successfully' });
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Update a payment
export const updatePayment = async (req, res, next) => {
    const { id } = req.params;
    const { amount, method, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such payment' });
    }

    try {
        const paymentEntry = await payment.findByIdAndUpdate(id, { amount, method, status }, { new: true });
        if (!paymentEntry) {
            return next(errorHandler(404, 'Payment Not Found'));
        }
        res.status(200).json(paymentEntry);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}

// Create a new payment
export const createPayment = async (req, res, next) => {
    const { amount, method, status } = req.body;

    try {
        const newPayment = new payment({ amount, method, status });
        await newPayment.save();
        res.status(201).json(newPayment);
    } catch (error) {
        next(errorHandler(500, 'Server Error'));
    }
}
